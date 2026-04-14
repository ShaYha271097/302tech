import BannerSlider from "@/components/BannerSlider/BannerSlider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MultiItemCarousel from "@/components/MultiItemCarousel/MultiItemCarousel";
import TopSellingSlider from "@/components/TopSellingSlider/TopSellingSlider";
import ProductSection from "@/components/ProductSection/ProductSection";

export default async function Home() {



  const res = await fetch("http://localhost:3000/api/home", {
    cache: "no-store",
  });

  const data = await res.json();



  console.log("data=>>>>>>>>>>>", data)
  return (
    <>
      <Header />
      <BannerSlider />
      <div className="wrap-home w-clear">
        <MultiItemCarousel />
        <TopSellingSlider />
        {/* <ProductSection
              title="HP"
              slug="hp"
              products={data.hp.products}
            /> */}
        <ProductSection
          title="Dell"
          slug="dell"
          products={data.dell.products}
        />
        <ProductSection
          title="Lenovo"
          slug="lenovo"
          products={data.lenovo.products}
        />
        {/* <ProductSection
              title="Apple"
              slug="apple"
              products={data.apple.products}
            /> */}
        {/* 
        <div className="wrap_bottom">
          <div className="fixwidth">
            <div className="row">
              <div className="col-md-6">
                <div className="all_chinhanh">
                  <div className="box_google_map">
                    <div className="name_google_map">Laptop 302 Tech Tây Ninh </div>
                    <div className="text_google_map">
                      <div className="mota_google_map ">
                        <p>Địa chỉ:</p>
                        Cơ sở 1:  302 Nguyễn Văn Rốp, Khu phố 5, Tân Ninh, Tây Ninh{" "}
                        <br /> Cơ sở 2: 546 Đ. Trịnh Thị Dối, Đông Thạnh, Hóc Môn, Hồ Chí Minh{" "}
                      </div>
                      <div className="box_ggmap_main d-flex align-items-center justify-content-center flex-wrap">
                        <div className="box_ggmap">
                          <a
                            href="https://maps.app.goo.gl/HmXdHWBthZQHYUED9"
                            target="_blank"
                          >
                            Bản đồ cửa hàng
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                    <div className="fanpage">
                      <div
                        className="fb-page fb_iframe_widget"
                      >
                        <span
                          style={{ verticalAlign: "bottom", width: 340, height: 165 }}
                        >
                          <iframe
                            name="f08382152ae72dc3f"
                            width="1000px"
                            height="165px"
                            data-testid="fb:page Facebook Social Plugin"
                            title="fb:page Facebook Social Plugin"
                            allow="encrypted-media"
                            src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=61568759679115&tabs=timeline&width=340&height=165&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"

                            style={{
                              border: "none",
                              visibility: "visible",
                              width: 340,
                              height: 165
                            }}
                            className=""
                          />
                        </span>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />



    </>
  );
}
