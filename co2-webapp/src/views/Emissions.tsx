import React from 'react';
import EmissionsTable from '../components/EmissionsTable';
import BarChart from '../components/BarChart';
import getEmissionsService from '../services/getEmissionsService';
import { EmissionDTO } from '../models/EmissionDTO';
import { Text, Select, Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import './Emissions.css';

type EmissionsState = {
    emissions: EmissionDTO[],
    searchTerm: string,
    date: string,
    seeChart: Boolean,
    country1: string,
    country2: string
}

class Emissions extends React.Component {
    state: EmissionsState = {
        emissions: [],
        searchTerm: '',
        date: '2000',
        seeChart: false,
        country1: 'Federal Republic of Germany',
        country2: 'France'
    }

    componentDidMount = async () => {
        await this.getEmissions(this.state.date);
    }

    getEmissions = async (year: string) => {
        const emissions = await getEmissionsService(year)
        this.setState({ emissions, filteredEmissions: emissions });
    }

    generateYearsOptions = (): JSX.Element[] => {
        let options: JSX.Element[] = [];
        for (let i = 2000; i < 2018; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    generateEmissionsOptions = (): JSX.Element[] => {
        let options: JSX.Element[] = [];
        this.state.emissions.forEach((emission, i) => {
            options.push(<option key={i} value={emission.place}>{emission.place}</option>);
        });
        return options;
    }

    displayContent = (): JSX.Element => {
        if (this.state.seeChart) {
            return (
                <BarChart 
                    emissions={this.state.emissions}
                    country1={this.state.country1}
                    country2={this.state.country2}
                    date={this.state.date} 
                />
            );
        } else { 
            return (
                <EmissionsTable 
                    emissions={this.state.emissions}
                    searchTerm={this.state.searchTerm}
                />
            );
        }
    }

    showCountriesToCompare = (): JSX.Element => {
        return (
            <div className="Countries">
                <Select
                    placeholder="Select a country"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        if (event.target.value) {
                            this.setState({ country1: event.target.value }, () => this.getEmissions(this.state.date));
                        }
                    }}
                >
                    {this.generateEmissionsOptions()}
                </Select>
                <Select
                    placeholder="Select a country"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        if (event.target.value) {
                            this.setState({ country2: event.target.value }, () => this.getEmissions(this.state.date));
                        }
                    }}
                >
                    {this.generateEmissionsOptions()}
                </Select>
            </div>
        );
    }

    buttonText = (): string => {
        return this.state.seeChart ? 'See statistical table' : 'See statistical chart';
    }

    render() {
        return (
            <div className='Container'>
                <Text
                    className='Title'
                    bgGradient='linear(to-r, #44ddc3, #6c33f1)'
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='bold'
                >
                    CO2 emissions
                </Text>
                <div className="Content">
                    <div className="Header">
                        {
                            this.state.seeChart 
                            ? null 
                            : <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<Search2Icon color='gray.300' />}
                                />
                                <Input 
                                    type='tel' 
                                    placeholder='Search'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        this.setState({ searchTerm: event.target.value });
                                    }}
                                />
                            </InputGroup>
                        }
                        <Select
                            placeholder="Select Date"
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                if (event.target.value) {
                                    this.setState({ date: event.target.value }, () => this.getEmissions(this.state.date));
                                }
                            }}
                        >
                            {this.generateYearsOptions()}
                        </Select>
                        {this.state.seeChart ? this.showCountriesToCompare() : null}
                    </div>
                    {this.displayContent()}
                    <Button
                        className='Button'
                        colorScheme='purple'
                        onClick={() => this.setState({ seeChart: this.state.seeChart ? false : true })}
                    >
                        {this.buttonText()}
                    </Button>
                </div>
                
            </div>
        );
    }
}

export default Emissions;