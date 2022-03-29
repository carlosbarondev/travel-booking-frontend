import { Banner } from "./Banner"
import { DateBar } from "./DateBar"
import { Covid } from "./Covid"
import { CountriesList } from "./CountriesList"
import { BestHotels } from "./BestHotels"

export const Home = () => {

    return (
        <>
            <Banner />
            <DateBar />
            <Covid />
            <CountriesList />
            <BestHotels />
        </>
    )
}