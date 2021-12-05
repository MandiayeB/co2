import React from 'react';
import { EmissionDTO } from '../models/EmissionDTO';
import './EmissionsTable.css';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react'

interface EmissionsTableProps {
    emissions: EmissionDTO[],
    searchTerm: string
}

interface EmissionsTableState { }

class EmissionsTable extends React.Component<EmissionsTableProps, EmissionsTableState> {
    render() {
        return (
            <div className="Table">
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th>Country</Th>
                            <Th>Date</Th>
                            <Th isNumeric>CO2 emission</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            this.props.emissions.filter(emission => {
                                if (
                                    this.props.searchTerm === '' 
                                    || emission.place.toLowerCase().includes(this.props.searchTerm.toLowerCase())
                                ) {
                                    return emission;
                                } else {
                                    return null;
                                }
                            }).map((emission, id) => {
                                    return (
                                        <Tr key={id}>
                                            <Td>{emission.place}</Td>
                                            <Td>{emission.datetime.split(' ')[0]}</Td>
                                            <Td isNumeric>{emission['Emission de CO2']}</Td>
                                        </Tr>
                                    );
                            })
                        }
                    </Tbody>
                </Table>
            </div>
        );
    }
}

export default EmissionsTable;