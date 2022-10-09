import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  return (
      <section className="page-intro">
        <div className="page-intro__slide" style={{ backgroundImage: "url('/images/banner-bg.jpg')", top: '-10px' }}>

          <div className="container">
            <div className="page-intro__slide__content">
              <p className='smallText'>{heroBanner.smallText}</p> 
              <h3>{heroBanner.midText}</h3>
              <h1>{heroBanner.largeText1}</h1>  

              <Link href={`/product/${heroBanner.product}`} >
                <a className="btn-shop"><i className="icon-right"></i>{heroBanner.buttonText}</a>
              </Link>

              <img src={urlFor(heroBanner.image)} alt="headphones"
                className='hero-banner-image' />
            </div>
            <div className="desc">
              <h5>{heroBanner.desc}</h5>
            </div>
          </div>

        </div>
      </section>
  )
}

export default HeroBanner