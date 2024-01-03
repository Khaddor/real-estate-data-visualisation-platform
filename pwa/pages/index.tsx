import Head from "next/head";
import Link from "next/link";
import React from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Welcome = () => (
  <>
    <Head>
      <title>Index</title>
    </Head>
    <div>
      <section className="home-section">
        <div className="home-content">
          <span className="text">Accueil</span>
        </div>
        <div className="home-title">
          <h1 className="text">Les agences immobilières en France</h1>
        </div>
        <div className="home-description">
          <div className="home-c1">
            <div className="home-rect">
              <div className="home-div-button">
                <Link href="/views">
                  <button className="home-button">
                    Visualisation des données
                  </button>
                </Link>
                <br />
                <Link href="/docs">
                  <button className="home-button">
                    Documentations De l'API
                  </button>
                </Link>
                <br />
                <Link href="/admin">
                  <button className="home-button">Admin Panel</button>
                </Link>
                <br />
              </div>
            </div>
          </div>
          <div className="home-c2"></div>
        </div>
        <div className="home-footer">2024. Tous droits réservés ©.</div>
      </section>
    </div>
  </>
);
export default Welcome;
