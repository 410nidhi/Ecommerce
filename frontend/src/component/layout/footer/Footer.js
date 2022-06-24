import React from "react"
import "./Footer.css"

const Footer = () => {
    return(
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android annd IOS mobile phone</p>
                <img src="http://assets.stickpng.com/images/5a902dbf7f96951c82922875.png" alt=""/>
                <img src="http://assets.stickpng.com/thumbs/5a902db97f96951c82922874.png" alt=""/>
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High quality is our first priority</p>
                <p>Copyrights 2022 &copy; Alpha</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/Alpha">Instagram</a>
                <a href="http://youtube.com/Alpha">Youtube</a>
                <a href="http://facebook.com/Alpha">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer;