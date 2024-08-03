
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Pagination, FreeMode } from "swiper/modules"
import { Course_Card } from "./Course_Card"
export const CourseSlider = ({ Course }) => {
    return (
        <div>
            {
                Course?.length ?
                    (<Swiper
                        slidesPerView={1}
                        spaceBetween={25}
                        loop={true}
                        pagination={{
                            clickable: true,
                          }}
                        modules={[FreeMode, Pagination]}

                        breakpoints={{
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="max-h-[30rem] "
                    >

                        {
                            Course.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <Course_Card Course={course} Height={"h-[250px]"}></Course_Card>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>) :
                    (<div>
                        No Course Right Now
                    </div>)
            }

        </div>
    )
}