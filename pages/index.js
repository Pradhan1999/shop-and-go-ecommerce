import React from 'react'

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner} from '../components';

const Home = ({products, bannerData, footBanner}) => (
  <div>
    {/* ______Hero Banner___________ */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    {/* ________Mid Banner________ */}

    <div className='products-heading'>
      <h2>Best Selling Products</h2>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    {/* ____________Footer_________ */}
    <FooterBanner footerBanner={footBanner && footBanner[0]}/>

  </div>
);

// getServerSideProps === useState 
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  
  const footerQuery = '*[_type == "footerBanner"]';
  const footBanner = await client.fetch(footerQuery);

  return {
    props: { products, bannerData, footBanner }
  }
}

export default Home;