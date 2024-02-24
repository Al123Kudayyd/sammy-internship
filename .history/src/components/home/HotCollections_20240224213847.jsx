import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HotCollections = () => {

  const[products, showProducts] = useState([])
  
  async function fetchProducts() {
    const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
    console.log(data)
    showProducts(data)
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {products.map((product) => (
            <Carousel responsive={responsive}>
            <div  className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={product.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                  
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={product.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{product.title}</h4>
                  </Link>
                  <span>ERC-{product.code}</span>
                </div>
              </div>
            </div>
          ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
