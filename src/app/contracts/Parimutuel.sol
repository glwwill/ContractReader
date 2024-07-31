// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract parimutuel {
  
uint256 public pool;
uint256 amount = 1000000000000000000; // 1 ether
   uint256 public oneWei = 1 wei;
    // 1 wei is equal to 1
    bool public isOneWei = (oneWei == 1);

    uint256 public oneGwei = 1 gwei;
    // 1 gwei is equal to 10^9 wei
    bool public isOneGwei = (oneGwei == 1e9);

    uint256 public oneEther = 1 ether;
    //1 ether is always equal to 1,000,000,000,000,000,000 Wei
//public uint256 public stake;
//Odds = (Pool - Wager) / Wager 
   // uint256 public TIMEOUT_IN_MS = 5 minutes;
    //uint256 public lastTimePlayed;
//event beted( uint _value);
struct horseintro {
    string horsename;
    uint horsenumber;
    uint betamount;

}

 horseintro[] public horses;
 
//mapping(Bets => uint256) public myBetMap;
address owner;
 receive() external payable {} 
struct Bets {
    uint betno;
    uint horse;
    address better;
    uint256 bet;
    uint odd;
}

//uint256 public oneWei = 1 wei;
    // 1 wei is equal to 1
   // bool public isOneWei = (oneWei == 1);

    //uint256 public oneGwei = 1 gwei;
    // 1 gwei is equal to 10^9 wei
    //bool public isOneGwei = (oneGwei == 1e9);

    //uint256 public oneEther = 1 ether;
    // 1 ether is equal to 10^18 wei
    //000000000000000001
    //bool public isOneEther = (oneEther == 1e18);
Bets[] bet;
    
constructor()  {
        owner=msg.sender;
       horseintro memory h;
       h= horseintro("horsea",1,0);
       horses.push(h);
       h= horseintro("horseb",2,0);
       horses.push(h);
       h= horseintro("horsec",3,0);
       horses.push(h);


    }

    function makeBet(uint256 horsrno) public payable {
        uint256 bnumber=bet.length+2;
        //require(msg.value>0,'not enoygh' );
//msg.value
        Bets memory b= Bets(bnumber,horsrno,msg.sender,1,7);
       horses[horsrno].betamount+=msg.value;
        bet.push(b);
        pool+=1;//msg.value;
        //deposit();
        //uint256(address(this).balance)=address(this).balance+ msg.value;

    } 
    function betBets()public view returns(uint256 horsea,uint256 horseb,uint256 horsec){
     //Odds = (Pool - TotalAmountWager) / TotalAmountWager 
     
  horsea=horses[1].betamount;
  horseb=horses[2].betamount;
  horsec=horses[3].betamount;

 if(horsea>0){
horsea=(pool-horsea)/horsea;
 }else{
    horsea=0;
 }
 if(horseb>0){
horseb=(pool-horseb)/horseb;
 }else{
    horseb=0;
 }
 if(horsec>0){
horsec=(pool-horsec)/horsec;
 }else{
    horsec=0;
 }
 
 
 return (horsea,horseb,horsec);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
}

function currentContractBalance() public view returns (uint) {
        return address(this).balance; // returns the balance of the contract itself using the `balance` and `this` keywords.
    }

    function deposit() public payable {}

function sendPayment(address payable recipient) public payable  {
    //   require(amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = recipient.call{value: msg.value}("");
         //(bool success, ) = recipient.call{value: amount}("");
          //pool -= amount ;
          //address(this).balance-=amount;
        require(success, "Payment failed.");
    }

}