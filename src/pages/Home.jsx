import { Category } from "../components/home/Category"
import { Hero } from "../components/home/Hero"
import {NewArrivals} from "../components/home/NewArrivals"
import { Testimonials } from "../components/home/Testimonials"
import { ScrollBasedVelocityDemo } from "../components/home/Velocity"
export const Home = () => {
    return (
        <>
        <ScrollBasedVelocityDemo/>
        <Hero/>
        <NewArrivals/>
        <Category/>
        <Testimonials/>
        </>
    )
}