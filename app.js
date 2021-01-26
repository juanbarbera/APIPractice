// sidenav logic

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// logic for plate information

const plateSearch = document.querySelector('#generalSearch');
const plateSubmit = document.querySelector('#plateSubmit');

const fetchPlateInfo = async (e) => {
    try {
        e.preventDefault();
        await responsePlateFetch();      
    } catch (e) {
        console.log("SOMETHING WENT WRONG!!!", e);
    }    
}

const responsePlateFetch = async () => {
    const vModel = document.querySelector('#vModel');
    const vYear = document.querySelector('#vYear');
    const vColor = document.querySelector('#vColor');
    const vYearModel = document.querySelector('#vYearModel');
    const vCity = document.querySelector('#vCity');
    const vState = document.querySelector('#vState');    
    const res = await fetch(`https://apicarros.com/v1/consulta/${generalSearch.value.toLowerCase()}/json`);
    const json = await res.json();
    vModel.innerText = json.modelo;
    vYear.innerText = json.ano;
    vColor.innerText = json.cor;
    vYearModel.innerText = json.anoModelo;
    vCity.innerText = json.municipio;
    vState.innerText = json.uf;
}

if(plateSubmit){
    plateSubmit.addEventListener('click', fetchPlateInfo);
}

// logic for zipcode information

const zipcodeSearch = document.querySelector('#generalSearch');
const zipcodeSubmit = document.querySelector('#zipcodeSubmit');

const fetchZipcodeInfo = async (e) => {
    try {
        e.preventDefault();
        await responseZipcodeFetch();
    } catch (e) {
        console.log("SOMETHING WENT WRONG!!!", e);
    }   
}

const responseZipcodeFetch = async () => {
    const zcZipcode = document.querySelector('#zcZipcode');
    const zcStreet = document.querySelector('#zcStreet');
    const zcComplement = document.querySelector('#zcComplement');
    const zcNeighborhood = document.querySelector('#zcNeighborhood');
    const zcCity = document.querySelector('#zcCity');
    const zcState = document.querySelector('#zcState');
    const zcAreaCode = document.querySelector('#zcAreaCode');
    const res = await fetch(`https://viacep.com.br/ws/${generalSearch.value}/json/`);
    const json = await res.json();
    zcZipcode.innerText = json.cep;
    zcStreet.innerText = json.logradouro;
    zcComplement.innerText = json.complemento;
    if (json.complemento === "") {
        zcComplement.innerText = 'não disponível';
    }
    zcNeighborhood.innerText = json.bairro;
    zcCity.innerText = json.localidade;
    zcState.innerText = json.uf;
    zcAreaCode.innerText = json.ddd;
}

if(zipcodeSubmit){
    zipcodeSubmit.addEventListener('click', fetchZipcodeInfo)
}

// exchange rate logic

const fetchExchangeRate = async (e) => {
    try {
        await responseExchangeRate();
        await responseBitcoin();
    } catch (e) {
        console.log("SOMETHING WENT WRONT!!!", e);
    }
}

const responseExchangeRate = async () => {
    const dollar = document.querySelector('#dollar');
    const euro = document.querySelector('#euro');
    const pound = document.querySelector('#pound');
    const argPeso = document.querySelector('#argPeso');
    const japanY = document.querySelector('#japanY');
    const res = await fetch('https://v6.exchangerate-api.com/v6/4f50c2f5843c9fe83fc45554/latest/BRL');
    const json = await res.json();
    const mdollar = json.conversion_rates.USD;    
    dollar.innerText = (1 / mdollar).toFixed(2); 
    const mEuro = json.conversion_rates.EUR;
    euro.innerText = (1 / mEuro).toFixed(2); 
    const mPound = json.conversion_rates.GBP;
    pound.innerText = (1 / mPound).toFixed(2);
    const margPeso = json.conversion_rates.ARS;
    argPeso.innerText = (1 / margPeso).toFixed(2);
    const mjapanY = json.conversion_rates.JPY;
    japanY.innerText = (1 / mjapanY).toFixed(2);      
}

const responseBitcoin = async () => {
    const bitcoin = document.querySelector('#bitcoin');
    const resBitcoin = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
    const jsonBitcoin = await resBitcoin.json();    
    const mBitcoin = jsonBitcoin.ticker.price;
    bitcoin.innerText = parseInt(mBitcoin).toFixed(2);
}

fetchExchangeRate();

