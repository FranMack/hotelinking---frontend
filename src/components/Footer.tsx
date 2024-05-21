
export function Footer(){
    const date = new Date();
  const year = date.getFullYear();

    return(<>
    <footer className="footer-container">

    <p
          className="footer-text"
         
        >{`Copyright © ${year} Francisco Mackinnon. All Rights Reserved `}</p>

    </footer>
    </>)
}