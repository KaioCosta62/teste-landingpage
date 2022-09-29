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

    btnProductsMore.style.display = 'none'
    spinner.style.display = 'block'

    function response(response){
      return response.json()
    }

    function dadosApi(dados){


    setTimeout(function(){
        spinner.style.display = 'none'

        for(let i = 0; i < dados.products.length; i++){
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
          moreProducts.innerHTML += htmlProducts
        }

      }, 800)
    }

    await fetch(`https://${page}`).then(response).then(dadosApi)

  })
}

function verifyForm(){
  let form = document.querySelector('#registration-user')
  let verifyErrorForm = false;

  form.addEventListener('submit', function(e){
    e.preventDefault()

    const inputName = document.forms['registration-user']['input-name']
    const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    const verifyName = regexName.test(inputName.value)

    if(!verifyName){
      verifyErrorForm = true
      inputName.classList.add('error-input')
      let span = inputName.nextElementSibling
      span.innerHTML = 'Insira um nome válido'
    }else{
      inputName.classList.remove('error-input')
      let span = inputName.nextElementSibling
      span.innerHTML = ''
    }
    
    const inputEmail = document.forms['registration-user']['input-email']
    const regexEmail = /\S+@\S+\.\S+/
    const verifyEmail = regexEmail.test(inputEmail.value)

    if(!verifyEmail){
      verifyErrorForm = true
      inputEmail.classList.add('error-input')
      let span = inputEmail.nextElementSibling
      span.innerHTML = 'Insira um e-mail válido'
    }else{
      inputEmail.classList.remove('error-input')
      let span = inputEmail.nextElementSibling
      span.innerHTML = ''
    }


    const inputCPF = document.forms['registration-user']['input-cpf']
    const regexCPF = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/
    const verifyCPF = regexCPF.test(inputCPF.value)

    if(!verifyCPF){
      verifyErrorForm = true
      inputCPF.classList.add('error-input')
      let span = inputCPF.nextElementSibling
      span.innerHTML = 'Insira um cpf válido'
    }else{
      inputCPF.classList.remove('error-input')
      let span = inputCPF.nextElementSibling
      span.innerHTML = ''
    }

    const inputSex = document.forms['registration-user']['sex']
    
    if(!inputSex.value){
      verifyErrorForm = true
      const labels = document.querySelectorAll('.check-sex label')
      labels.forEach((label) => {
      label.style.color = 'red'
      })
    }else{
      const labels = document.querySelectorAll('.check-sex label')
      labels.forEach((label) => {
      label.style.color = 'var(--color-primary)'
      })
    }

    if(!verifyErrorForm){
      form.submit()
    }

  })
}

showProducts()
showMoreProducts()
verifyForm()