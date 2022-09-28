let page = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'

async function showProducts() {
  const productsWrapper = document.querySelector('.products .products-wrapper')
  const spinner = document.querySelector('.spinner')

  let htmlProducts;  


  function response(response){
    return response.json()
  }

  function dadosApi(dados){
    page = dados.nextPage
    setTimeout(function(){
      spinner.style.display = 'none'

      for(let i = 0; i <= dados.products.length; i++){
        htmlProducts = `
        <div class="product-single">
        <img class="image" src = "${dados.products[i].image}"></img>
        <div class="info-price">
          <h3>${dados.products[i].name}</h3>
          <p>
            ${dados.products[i].description}
          </p>
          <span class="in">De: R$${dados.products[i].oldPrice},00</span>
          <span class="per">Por: R$${dados.products[i].price},00</span>
          <span class="split-price">ou ${dados.products[i].installments.count}x de R$${dados.products[i].installments.value}</span>
          <button>Comprar</button>
        </div>
      </div>
      `
      productsWrapper.innerHTML += htmlProducts
      }
    }, 800)
  }

  await fetch(page).then(response).then(dadosApi)

}

function showMoreProducts(){
  const btnProductsMore = document.querySelector('.more-products')
  const moreProducts = document.querySelector('.more-products-api')
  const spinner = document.querySelector('.spinner-more')

  let htmlProducts;
  btnProductsMore.addEventListener('click', async function(){

    spinner.style.display = 'block'

    function response(response){
      return response.json()
    }

    function dadosApi(dados){


    setTimeout(function(){
        spinner.style.display = 'none'

        for(let i = 0; i <= dados.products.length; i++){
          htmlProducts = `
          <div class="product-single">
            <img class="image" src = "${dados.products[i].image}"></img>
            <div class="info-price">
              <h3>${dados.products[i].name}</h3>
              <p>
                ${dados.products[i].description}
              </p>
              <span class="in">De: R$${dados.products[i].oldPrice},00</span>
              <span class="per">Por: R$${dados.products[i].price},00</span>
              <span class="split-price">ou ${dados.products[i].installments.count}x de R$${dados.products[i].installments.value}</span>
              <button>Comprar</button>
            </div>
          </div>
          `

          btnProductsMore.style.display = 'none'
          moreProducts.innerHTML += htmlProducts
        }

      }, 800)
    }

    await fetch(`https://${page}`).then(response).then(dadosApi)

  })
}

showProducts()
showMoreProducts()