import React ,{useEffect,useState}from 'react';
import './App.css';


function App() {
  const [coins,setcoins] =useState([])
  const [search,setsearch]=useState("")
  useEffect(()=>{ // coin verilerilerini aldık
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res=>res.json())
    .then(data=>{setcoins(data); console.log(data)})
  },[])
  const [dizi,setdizi]=useState([])
  useEffect(()=>{ // coins search a göre filtreledik eger arama ksımı boş ise direk dizinin kendisini dolu ise coin.name ile eşleşen elemanları yeni diziye atayıp onları ekranda gösterdik
    setdizi(coins.filter((coins)=>{return search?.toLowerCase()==='' ? coins : coins.name.toLowerCase().includes(search)}))
  },[search,coins])
  return (
    <div className="App">
    <h3>Coin Market </h3>
      <table>
        <tr>
          <td>{dizi.length} results</td>
          <td colSpan={2} style={{textAlign:'center'}}><input onChange={(e)=>setsearch(e.target.value)} placeholder='Arama Yap'></input></td>
          <td> </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>Symbol</td>
          <td>Price</td>
          <td>Change</td>
        </tr>
        {
        dizi.map((coin)=>( 
        <tr key={coin.id}> 
          <td><img src={coin.image} alt=''></img>{coin.name}</td>
          <td>{coin.symbol}</td>
          <td>{coin.current_price} $</td>
          <td style={{ color: /-/i.test(coin.price_change_percentage_24h) ? "#ff0374" : "#06a847" }}>{(coin.price_change_percentage_24h)}% </td>
          {/* ustteki kodda price changenin içinde - varmı yokmu kontrol ettik ona gre kırmızı veya yeşil renge boyadık */}
        </tr>
          )) 
        }
        
      </table>
    </div>
  );
}

export default App;
