// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./SafeMath.sol";

/**
 * @title GTA FAN TOKEN
 * @dev A Solidity smart contract representing the GTA FAN token, an ERC20-compliant token with additional features such as ICO and airdrop.
 * This contract provides functionalities for managing the token, including transfers, approvals, ICO participation, airdrops, burning, and withdrawal of Ether.
 * The token has the following properties:
 * - Name: GTA FAN TOKEN
 * - Symbol: GTAFAN
 * - Decimals: 8
 * - Initial Supply: Defined upon contract deployment
 * - Owner: The address that deployed the contract
 * - Active: Indicates whether the token functionalities are active or not
 * - Active ICO: Indicates whether the ICO is active or not
 * - Airdrop List: Maintains a list of addresses eligible for airdrop distribution
 * - Token Price Calculation: Calculates the price of tokens based on the value sent
 * - Burning: Allows burning of tokens by the token owner
 * - Withdrawal: Allows withdrawal of Ether from the contract balance by the owner
 * - Contract Balance: Provides the balance of Ether held by the contract
*/

contract GtaFanToken is IERC20 {
    using SafeMath for uint256;

    // Token metadata
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
    
    // Ownership
    address private _owner;
    address payable private PayableOwner;

    // Token state
    bool private active = true ;
    bool private isActiveICO = true ;

    // Airdrop mapping
    mapping(address => bool) private isAddedToAirdrop;

    // Balances and allowances mapping
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // Events
    event TokensPurchased(address indexed purchaser, uint256 value, uint256 amount);


    /**
     * @dev Constructor to initialize the token with initial supply.
     * @param __name The name of the token.
     * @param __symbol The symbol of the token.
     * @param __decimals The number of decimals for the token.
     * @param _initialSupply The initial supply of the token.
     */
    constructor(string memory __name, string memory __symbol, uint8 __decimals, uint256 _initialSupply) {
        _owner = msg.sender;
        PayableOwner = payable(msg.sender);
        _name = __name;
        _symbol = __symbol;
        _decimals = __decimals;
        _totalSupply = _initialSupply * 10 ** uint256(_decimals);
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    /**
     * @dev Modifier to only allow the owner to execute a function.
     */
    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }

    /**
     * @dev Modifier to check if the token is active or not.
     */
    modifier ActiveorNotacive() {
        require( active , "the airdrop is over");
        _;
    }

    /**
     * @dev Modifier to check if the ICO is active or not.
     */
    modifier ActiveICO() {
        require( isActiveICO , "the ICO is over");
        _;
    }

    /**
     * @dev Get the total supply of the token.
     * @dev Get the name of the token.
     * @dev Get the symbol of the token.
     * @dev Get the decimals of the token.
     */
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function name() external view override returns (string memory) {
        return _name ;
    }

    function symbol() external view override returns (string memory) {
        return _symbol ;
    }

    function decimals() external view override returns (uint) {
        return _decimals ;
    }



    /**
     * @dev Get the balance of an account.
     * @param account The address of the account.
     */
    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Transfer tokens from the sender to another address.
     * @param recipient The address to receive the tokens.
     * @param amount The amount of tokens to transfer.
     * @return True if the transfer is successful, revert otherwise.
     */
    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    
    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev Approve the spender to spend the specified amount of tokens on behalf of the owner.
     * @param spender The address allowed to spend the tokens.
     * @param amount The amount of tokens allowed to be spent.
     * @return True if the approval is successful, revert otherwise.
     */
    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another.
     * @param sender The address to transfer tokens from.
     * @param recipient The address to transfer tokens to.
     * @param amount The amount of tokens to transfer.
     * @return True if the transfer is successful, revert otherwise.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        _transfer(sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) external returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool) {
        uint256 currentAllowance = _allowances[msg.sender][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        _approve(msg.sender, spender, currentAllowance - subtractedValue);
        return true;
    }

     /**
     * @dev Set the active status of the token.
     */
    function activeView () public view returns(bool){
        return active;
    }

    function _transfer(address sender, address recipient, uint256 amount) private {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "ERC20: transfer amount must be greater than zero");
        require(_balances[sender] >= amount, "ERC20: insufficient balance");


        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Get the active status of the token.
     */
    function setActive() external onlyOwner() returns(bool){
        if(active){
            active = false;
        }else{
            active = true;
        }
        return active;
    }

   /**
     * @dev Add an address to the airdrop list and distribute tokens.
     * @param _getAirdrop The address to be added to the airdrop list.
     */
    function addAddress(address _getAirdrop)external payable ActiveorNotacive(){
        require(!isAddedToAirdrop[_getAirdrop], "Address already added to the airdrop list");
        require(msg.value >= 0.007 ether , "ether is not Enough for this function");
        require(msg.sender == _getAirdrop , "address of the sender must be the same as the address of the recipient");
        uint256 amountPerRecipient = 1000 * (10 ** uint256(_decimals)); // 1000 tokens with decimals adjustment
        payable(msg.sender).transfer(msg.value - 0.007 ether);
        _transfer(_owner , _getAirdrop , amountPerRecipient);
        isAddedToAirdrop[_getAirdrop] = true;
    }


    //==================================================
    // ICO Management Functions
    //==================================================

    uint256 constant private ETHER_PER_TOKEN = 1 * 10**5;

    /**
     * @dev Buy tokens during the ICO.
     */
    function buyTokens() external payable ActiveICO() {
        require(msg.value >= 0.001 ether, "The minimum purchase price is 0.001 BNB.");
        require(msg.value <= 30 ether , "The limit for buying foreign currency is 30 BNB");
        payable(msg.sender).transfer(msg.value - msg.value);
        uint setvalue = msg.value / (0.00000001 ether) * ETHER_PER_TOKEN;
        _transfer( _owner , msg.sender , setvalue);
        emit TokensPurchased(msg.sender, msg.value, setvalue);
    }

    /**
     * @dev Set the active status of the ICO.
     * @return The new active status of the ICO.
     */
    function setActiveICO() external onlyOwner() returns(bool){
        if(isActiveICO){
            isActiveICO = false;
        }else{
            isActiveICO = true;
        }
        return active;
    }

    /**
     * @dev View the active status of the ICO.
     * @return The current active status of the ICO.
     */
    function activeViewICO () public view returns(bool){
        return isActiveICO;
    }


    //==================================================
    // Utility Functions
    //==================================================

    /**
     * @dev Calculate the price of tokens based on the value sent.
     * @param value The value in wei to calculate the price for.
     * @return The price of tokens in wei.
     */
    function PriceToken(uint value)public pure returns(uint){
        return value *(10**18) / (0.00000001 ether) * ETHER_PER_TOKEN;
    }


    //==================================================
    // Token Burning and Withdrawal Functions
    //==================================================

    /**
     * @dev Burn tokens from the caller's balance.
     * @param amount The amount of tokens to burn.
     */
    function _burn(uint256 amount) external {
        require(_balances[msg.sender] >= amount , "");
        _balances[msg.sender] -= amount*(10 ** uint256(_decimals));
        _totalSupply -= amount*(10 ** uint256(_decimals));
        emit Transfer(msg.sender, address(0), amount);
    }

    /**
     * @dev Withdraw Ether from the contract balance.
     */
    function withdraw() external onlyOwner() {
        require(msg.sender == PayableOwner, "Only the owner can withdraw Ether");
        payable(PayableOwner).transfer(address(this).balance);
    }

    /**
     * @dev Get the balance of Ether held by the contract.
     * @return The balance of Ether held by the contract.
     */
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }

 

}


