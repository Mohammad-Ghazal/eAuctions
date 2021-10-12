//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../footer/footer.css"

export const Footer = () => {
  return(
       <div>
     <div class="foo_top_header_one section_padding_100_70">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="kilimanjaro_part">
                            <h5>About Us</h5>
                            <p>It includes rich features & contents. It's designed & developed based on One Page/ Multi-page Layout,blog themes,world press themes and blogspot. You can use any layout from any demo anywhere.</p>
                            <p>Our company is completely creative, clean & 100% responsive website. Put your business into next level with us.</p>
                        </div>
                        <div class="kilimanjaro_part m-top-15">
                            <h5>Social Links</h5>
                            <ul class="kilimanjaro_social_links">
                                <li><Link href="#"><i class="fa fa-facebook" aria-hidden="true"></i> Facebook</Link></li>
                                <li><Link href="#"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</Link></li>
                                <li><Link href="#"><i class="fa fa-pinterest" aria-hidden="true"></i> Pinterest</Link></li>
                                <li><Link href="#"><i class="fa fa-youtube" aria-hidden="true"></i> YouTube</Link></li>
                                <li><Link  href="#"><i class="fa fa-linkedin" aria-hidden="true"></i> Linkedin</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="kilimanjaro_part">
                            <h5>Tags Widget</h5>
                            <ul class=" kilimanjaro_widget">
                                <li><Link href="#">Classy</Link></li>
                                <li><Link href="#">Blog</Link></li>
                                <li><Link href="#">Creative</Link></li>
                                <li><Link href="#">One Page</Link></li>
                                <li><Link href="#">Multipurpose</Link></li>
                                <li><Link href="#">Minimal</Link></li>
                                <li><Link href="#">Classic</Link></li>
                                <li><Link href="#">Medical</Link></li>
                            </ul>
                        </div>

                        <div class="kilimanjaro_part m-top-15">
                            <h5>Important Links</h5>
                            <ul class="kilimanjaro_links">
                                <li><Link  href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Terms & Conditions</Link></li>
                                <li><Link href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>About Licences</Link></li>
                                <li><Link href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Help & Support</Link></li>
                                <li><Link href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Careers</Link></li>
                                <li><Link href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Privacy Policy</Link></li>
                                <li><Link href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Community & Forum</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="kilimanjaro_part">
                            <h5>Latest News</h5>
                            <div class="kilimanjaro_blog_area">
                                <div class="kilimanjaro_thumb">
								<img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt=""/>

                                </div>
                                <Link href="#">Your Blog Title Goes Here</Link>
                                <p class="kilimanjaro_date">21 Jan 2018</p>
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                            <div class="kilimanjaro_blog_area">
                                <div class="kilimanjaro_thumb">
								<img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt=""/>
                                </div>
                                <Link href="#">Your Blog Title Goes Here</Link>
                                <p class="kilimanjaro_date">21 Jan 2018</p>
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                            <div class="kilimanjaro_blog_area">
                                <div class="kilimanjaro_thumb">
								<img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt=""/>
                                </div>
                                <Link href="#">Your Blog Title Goes Here</Link>
                                <p class="kilimanjaro_date">21 Jan 2018</p>
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="kilimanjaro_part">
                            <h5>Quick Contact</h5>
                            <div class="kilimanjaro_single_contact_info">
                                <h5>Phone:</h5>
                                <p>+255 255 54 53 52 <br/> +255 255 53 52 51</p>
                            </div>
                            <div class="kilimanjaro_single_contact_info">
                                <h5>Email:</h5>
                                <p>support@email.com <br/> company@email.com</p>
                            </div>
                        </div>
                        <div class="kilimanjaro_part">
                            <h5>Latest Works</h5>
                            <div class="kilimanjaro_works">
                                <Link class="kilimanjaro_works_img" href="img/gallery/1.jpg"><img src="img/gallery/1.jpg" alt=""/></Link>
                                <Link class="kilimanjaro_works_img" href="img/gallery/4.jpg"><img src="img/gallery/4.jpg" alt=""/></Link>
                                <Link class="kilimanjaro_works_img" href="img/gallery/5.jpg"><img src="img/gallery/5.jpg" alt=""/></Link>
                                <Link class="kilimanjaro_works_img" href="img/gallery/7.jpg"><img src="img/gallery/7.jpg" alt=""/></Link>
                                <Link class="kilimanjaro_works_img" href="img/gallery/10.jpg"><img src="img/gallery/10.jpg" alt=""/></Link>
                                <Link class="kilimanjaro_works_img" href="img/gallery/11.jpg"><img src="img/gallery/11.jpg" alt=""/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div class=" kilimanjaro_bottom_header_one section_padding_50 text-center">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p>© All Rights Reserved by <Link href="#">My Footer<i class="fa fa-love"></i></Link></p>
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
};


