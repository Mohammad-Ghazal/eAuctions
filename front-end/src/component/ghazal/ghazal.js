import React from "react";
import "../home/about/about.css";
function ghazal() {
  return (
    <>
      <div class="word">
        <div class="sec title-page">
          <h2>
            <span>Aucation Item</span>
          </h2>
        </div>
      </div>
      <section class="about" id="about">
        <div class="content">
          <div class="column col-left reveal">
            <div class="img-card">
              <img
                src="https://cdn.pixabay.com/photo/2017/06/09/01/03/books-2385402__340.jpg"
                alt="image"
              />
            </div>
          </div>
          <div class="column col-right reveal">
            <h2 class="content-title"> OWNER BATOOL MAALI</h2>
            <div className="Aucation">
              <h5> START Bid: 2200$</h5>
              <h5>Auction start: 22-22-2303</h5>
              <h5>Auction end: 22-22-2303</h5>
              <br />
              <p className="pr">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                distinctio beatae voluptas! At aperiam iure hic quibusdam quia
                nam, ut error rem nobis doloribus adipisci unde omnis atque quas
                repellat! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Illum distinctio beatae voluptas! At aperiam iure hic
                quibusdam quia nam, ut error rem nobis doloribus adipisci unde
                omnis atque quas repellat! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Illum distinctio beatae voluptas!
                At voluptas! At
              </p>
              <h5> Price Till Now: 2200$</h5>
              <h5>ddddddddd</h5>
              <br />
            </div>
            <div>
              <div className="liveAuctions">
                <button className="btn1">-</button>
                <input
                  type="number"
                  id="bidValue"
                  className="liveAuction_input"
                  required

                  // placeholder={lastBid + bidJumb}
                />
                <button className="btn1">+</button><br/>
                <button class="button">Bid Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ghazal;
