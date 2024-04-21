import Table from "react-bootstrap/Table";
import React, {useState} from "react";
import {CustomPagination} from "@/table/customPagination";

interface DisplayValues {
    [key: string]: {
        title: string;
        key: string;
    };
}

interface DataSource {
    [key: string]: any
}

const START_PAGE = 1;
const LIMIT_PAGES = 20;

export const CustomTable: React.FC<{
    dataSource: DataSource[]
    displayValues: DisplayValues
}> = ({dataSource, displayValues}) => {
    const [currentPage, setCurrentPage] = useState(START_PAGE);

    if(!dataSource || !displayValues) {
        return
    }

    const keyOfDisplayValues = Object.keys(displayValues)
    const totalPages = Math.ceil(dataSource.length / LIMIT_PAGES);

    const indexOfLastUser = currentPage * LIMIT_PAGES;
    const indexOfFirstUser = indexOfLastUser - LIMIT_PAGES;

    const currentDataToDisplay = dataSource.slice(indexOfFirstUser, indexOfLastUser);
    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)


    
    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {keyOfDisplayValues.map(value => {
                        const currentDisplayValue = displayValues[value]
                        return <th key={currentDisplayValue.key}>{currentDisplayValue.title}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {currentDataToDisplay.map((data) => (
                    <tr key={data.id}>
                        {keyOfDisplayValues.map(value => {
                            const currentDisplayValue = displayValues[value]
                            return <th key={data.id + currentDisplayValue.key}>{data[currentDisplayValue.key]}</th>
                        })}
                    </tr>
                ))}
                </tbody>
            </Table>
            <CustomPagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}