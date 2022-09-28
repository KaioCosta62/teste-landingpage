async function showProducts() {
  const productsWrapper = document.querySelector('.products .products-wrapper')
  const spinner = document.querySelector('.spinner')

  let htmlProducts;  


  function response(dados){
    return dados.json()
  }

  function dadosApi(response){
    setTimeout(function(){
      spinner.style.display = 'none'

      for(let i = 0; i <= response.products.length; i++){
        htmlProducts = `
        <div class="product-single">
        <img class="image" src = "${response.products[i].image}"></img>
        <div class="info-price">
          <h3>${response.products[i].name}</h3>
          <p>
            ${response.products[i].description}
          </p>
          <span class="in">De: ${response.products[i].oldPrice},00</span>
          <span class="per">Por: ${response.products[i].price},00</span>
          <span class="split-price">ou ${response.products[i].installments.count}x de ${response.products[i].installments.value}</span>
          <button>Comprar</button>
        </div>
      </div>
      `
      productsWrapper.innerHTML += htmlProducts
      }
    }, 400)

    console.log(response.products)
  }

  await fetch('https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1').then(response).then(dadosApi)

}

showProducts()