import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import './BeerList.scss'
import { getBeersList } from '../api/ApiList';
import { setBeerList } from '../store/actions/action';

const BeerList = () => {
    const [page, setPage] = useState<any>(1);
    const [brewedBefore,setBrewedBefore] = useState('');
    const [brewedAfter,setBrewedAfter] = useState('');
    const [filterOnLoad,setFilterOnload] = useState(false);
    const beers = useSelector((state: any) => state.beers);
    const dispatch = useDispatch();

    useEffect(() => {
        if(filterOnLoad === false){
            fetchBeers();
        }   
    }, [page]);

    const fetchBeers = async () => {
        const response: any = await getBeersList(page,brewedBefore,brewedAfter);
        dispatch(setBeerList(response.data));
    };

    const handleFilter = async (e: any,key: number) => {
        setFilterOnload(true);
        setPage(1);
        let response: any;
        if(key === 1){
            setBrewedAfter(e.target.value)
            response= await getBeersList(page,brewedBefore,e.target.value);
        }
        else if(key === 2){
            setBrewedBefore(e.target.value)
            response = await getBeersList(page,e.target.value,brewedAfter);
        }
        setFilterOnload(false);
        dispatch(setBeerList(response.data));
      };

    return (
        <div className='container-block'>

            {/* Filter Section */}
            <div className='filter-container'>
                <div className='heading-field'>Filter:</div>
                <div className='input-sec'>
                    <div className='input-title'>
                        Brewed After:
                    </div>
                    <div>
                        <input 
                            value={brewedAfter} 
                            placeholder='Brewed After' 
                            type='month' 
                            className='brewed-input' 
                            onChange={(e:any) => handleFilter(e,1)}>
                        </input>
                    </div>
                </div>
                <div className='input-sec'>
                    <div className='input-title'>
                        Brewed Before:   
                    </div>
                    <div>
                        <input 
                            value={brewedBefore} 
                            placeholder='Brewed Before' 
                            type='month' 
                            className='brewed-input' 
                            onChange={(e:any) => handleFilter(e,2) }>
                        </input>
                    </div>
                </div>
            </div>

            {/* This is a Table Section */}
            <Table hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Tagline</th>
                        <th>First Brewed</th>
                        <th>Description</th>
                        <th>Brewers Tips</th>
                    </tr>
                </thead>
                <tbody>
                    {beers.map((beer: any) => (
                        <tr key={beer.id}>
                            <td>
                                <div className='img-section'>
                                    <img src={beer.image_url} alt={beer.image_url}/>
                                </div>
                            </td>
                            <td>
                                <div className='text-fields'>{beer.name}</div>
                            </td>
                            <td>
                                <div className='text-fields'>{beer.tagline}</div>
                            </td>
                            <td>
                                <div className='text-fields' style={{width: '100px'}}>{beer.first_brewed}</div>
                            </td>
                            <td>
                                <div className='text-fields' style={{width: '400px'}}>{beer.description}</div>
                            </td>
                            <td>
                                <div className='text-fields' style={{width: '300px'}}>{beer.brewers_tips}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* This is a Pagination Section */}
            <div className='d-flex justify-content-end'>
                <button 
                    type="button" 
                    className="btn btn-light" 
                    disabled={page === 1}
                    onClick={() => setPage(parseInt(page) -1)}>
                        Previous
                </button>
                <input 
                    value={page} 
                    type='number' 
                    className='page-input-filed'
                    onChange={(e:any) => setPage(e.target.value)}>
                </input>
                <button 
                    type="button" 
                    className="btn btn-light" 
                    onClick={() => setPage(parseInt(page) + 1)}>
                        Next
                </button>
            </div>
        </div>
    );
};

export default BeerList;