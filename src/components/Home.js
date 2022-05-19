import { Link } from "react-router-dom";
import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";

export default class Home extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            dotsClass: "slick-dots",
            arrows: true
        };

        return (
            <div style={{ display: "grid" }}>
                <div className="container">
                    <div className="box" style={{ marginTop: "50px" }}>
                        <Slider {...settings} >
                            <div className="circle">
                                <img src={this.props.first} alt="rank1" width="300px" height="300px" />
                            </div>
                            <div className="circle">
                                <img src={this.props.second} alt="rank2" width="300px" height="300px" />
                            </div>
                            <div className="circle">
                                <img src={this.props.third} alt="rank3" width="300px" height="300px" />
                            </div>
                            <div className="circle">
                                <img src={this.props.fourth} alt="rank4" width="300px" height="300px" />
                            </div>
                            <div className="circle">
                                <img src={this.props.fifth} alt="rank5" width="300px" height="300px" />
                            </div>
                        </Slider>
                    </div>
                    <div className="box">
                        <p className="start">Start a whole new trade.</p>
                        <h4 style={{ fontWeight: "200" }}>BokSociety is world's cutest marketplace.</h4>
                        <br /><br />
                        <Link to="/Create" className="homeBtnC">Create</Link>
                        <Link to="/Market" className="homeBtn">Market</Link>
                    </div>
                </div>
            </div>
        );
    }
}
