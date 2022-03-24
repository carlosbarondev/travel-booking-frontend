import { Banner } from "./Banner"
import { CategoriesList } from "./CategoriesList"
import { CountriesList } from "./CountriesList"
import { Covid } from "./Covid"
import { DateBar } from "./DateBar"
import { DiscoverList } from "./DiscoverList"

export const Home = () => {

    return (
        <>
            <Banner />
            <DateBar />
            <Covid />
            <CountriesList />
            <CategoriesList />
            <DiscoverList />
        </>
    )
}