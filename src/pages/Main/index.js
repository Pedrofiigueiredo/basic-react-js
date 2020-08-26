import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';

import './styles.css';

export default class Main extends Component {

  state = {
    // products começa como um array vazio
    products: [],
    productsInfo: {},
    page: 1,
  }
  // Executado quando mostrado na tela
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    // ... Rest operator. Docs é response.data.docs e productsInfo é todo o restante
    const { docs, ...productsInfo } = response.data;

    // Atualiza a variável Estado com os dados da API
    this.setState({ products: docs, productsInfo, page });
  }

  nextPage = () => {
    const { page, productsInfo} = this.state;

    if(page === productsInfo.pages) return;

    // Atualiza o número da página
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  }

  prevPage = () => {
    const { page } = this.state;

    if(page === 1 ) return;

    const pageNumber = page - 1;
    this.loadProducts(pageNumber);
  }
  
  render() {
    // Desestruturação só para diminuir um pouco o código
    const { products, page, productsInfo } = this.state;

    return(
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}

        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productsInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    );
  }
}