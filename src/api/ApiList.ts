import axios from "axios";
import moment from "moment";

export const getBeersList = async (page = 1, brewedBefore = '', brewedAfter = '')  => {
    try{
        let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

        if (brewedBefore) {
            url += `&brewed_before=${moment(brewedBefore).format('MM-YYYY')}`;
        }

        if (brewedAfter) {
            url += `&brewed_after=${moment(brewedAfter).format('MM-YYYY')}`;
        }

        const response = await axios.get(url);
        return response
    }catch (err) {
        console.log(err);
    }
};

