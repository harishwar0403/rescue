import "./Footerstyles.css";

const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Flood Rescue Service Provider</h1>
                    <p>Choose your favourite</p>
                </div>

                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    
                    <a href="/">
                        <i className="fa-brands fa-bshance-square"></i>
                    </a>
                    
                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div >
                    <h4>Project</h4>
                    <a href="/">Changelog</a>
                    <a href="/">Status</a>
                    <a href="/">Liseance</a>
                    <a href="/">All versions</a>
                </div>
                <div >
                    <h4>Community</h4>
                    <a href="/">GitHub</a>
                    <a href="/">Issuses</a>
                    <a href="/">Project</a>
                    <a href="/">twitter</a>
                </div>
                <div >
                    <h4>help</h4>
                    <a href="/">Support</a>
                    <a href="/">Trubleshooting</a>
                    <a href="/">Contact Us</a>
                </div>
                <div >
                    <h4>Others</h4>
                    <a href="/">Terms of Services</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Liseance</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;