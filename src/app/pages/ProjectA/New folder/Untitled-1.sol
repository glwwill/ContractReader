// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract parimutuel {
  
uint256 public pool;
uint256 amount = 1000000000000000000; // 1 ether
   uint256 private oneWei = 1 wei;
    // 1 wei is equal to 1
    bool private isOneWei = (oneWei == 1);

    uint256 private oneGwei = 1 gwei;
    // 1 gwei is equal to 10^9 wei
    bool private isOneGwei = (oneGwei == 1e9);

    uint256 private oneEther = 1 ether;
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
struct Odds {
    uint horse;
    uint256 payout;
}


Bets[] public bets;

constructor()  {
        owner=msg.sender;
       horseintro memory h;
       h= horseintro("horsea",0,0);
       horses.push(h);
       h= horseintro("horseb",1,0);
       horses.push(h);
       h= horseintro("horsec",2,0);
       horses.push(h);
        h= horseintro("horsed",3,0);
       horses.push(h);
       h= horseintro("horsee",4,0);
       horses.push(h);
       h= horseintro("horsef",5,0);
       horses.push(h);
makeBet(0,10);
makeBet(1,15);
makeBet(2,10);
makeBet(3,25);
makeBet(4,15);
makeBet(5,25);
    }

    function makeBet(uint256 horsrno,uint tokenamount) public payable {
        uint256 bnumber=bets.length+2;
        //require(msg.value>0,'not enoygh' );
//msg.value
        Bets memory b= Bets(bnumber,horsrno,msg.sender,tokenamount,7);
        horses[horsrno].betamount+=tokenamount;//msg.value;
        bets.push(b);
        pool+=tokenamount;//msg.value;
        //deposit();
        //uint256(address(this).balance)=address(this).balance+ msg.value;

    } 
    function betBets(uint256 horseidnumber)public view returns(string memory horse,uint256 horsenumber,uint256 payout){
     //Odds = (Pool - TotalAmountWager) / TotalAmountWager 
    // string horsename;
    //uint horsenumber;
    //uint betamount;
    //IF(D3>2,

//CONCATENATE(“+”,ROUND((D3–1)*100,0)),

//CONCATENATE(“-”,ROUND(100/(D3–1),0)))
      
     horse=horses[horseidnumber].horsename;
     horsenumber=horses[horseidnumber].horsenumber;
      uint256 amountbet  =horses[horseidnumber].betamount;
      //uint payoutmutiple;
        if(amountbet>0){
//horsea=((pool-horsea)/horsea)*100;
payout=(pool/amountbet-getVig());
 }else{
    payout=0;
 }

 if(payout>2){
payout=(payout-1)*100;
 }else{
   payout=(100/payout-1); 
 }
      return(horse,horsenumber,payout);
      

  
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
}



function getPayOut(uint256 winnerHorse) public view{
//Bets[] public bets;
//Bets memory b= Bets(bnumber,horsrno,msg.sender,tokenamount,7);
// ,,pout=betBets(winnerHorse);
for(uint256 x=0;x<bets.length;x++){
    if(bets[x].horse==winnerHorse){

    }

}

}

function getVig() public view returns(uint){
    return pool/100;
}
function currentContractBalance() public view returns (uint) {
        return address(this).balance; // returns the balance of the contract itself using the `balance` and `this` keywords.
    }

   // function deposit(uint256 betamount) public payable {
   //     require(msg.value == betamount);
   // }

//function sendPayment(address payable recipient) public payable  {
  //  //   require(amount <= address(this).balance, "Insufficient balance");
   //     (bool success, ) = recipient.call{value: msg.value}("");
   //      //(bool success, ) = recipient.call{value: amount}("");
   //       //pool -= amount ;
   //       //address(this).balance-=amount;
   //     require(success, "Payment failed.");
   // }

}