import React, {useRef, useState} from "react";
import Pagination from "react-bootstrap/Pagination";

const DEFAULT_LENGTH = 20
export const CustomPagination: React.FC<{
    handlePageChange: (currentPage: number) => void
    currentPage: number
    totalPages: number,
    paginationLength?: number
}> = ({handlePageChange, currentPage, totalPages, paginationLength = DEFAULT_LENGTH}) => {
    const [shiftPagesIndex, setShiftPagesIndex] = useState<number>(0)
    const refPaginationInfo = useRef<{firstPaginationPage: number, lastPaginationPage: number}>({
        firstPaginationPage: 1,
        lastPaginationPage: paginationLength
    })

    const handleShiftPagesBack = (page: number): void => {
        const {firstPaginationPage} = refPaginationInfo.current
        if (page < firstPaginationPage && page >= paginationLength) {
            setShiftPagesIndex(page - paginationLength)
            refPaginationInfo.current = {
                firstPaginationPage: page - paginationLength + 1,
                lastPaginationPage: page
            }
        }
        
        handlePageChange(page)
    }

    const handleShiftPagesForward = (page: number): void => {
        const {lastPaginationPage} = refPaginationInfo.current
        if (page > lastPaginationPage && lastPaginationPage < totalPages) {
            setShiftPagesIndex(page - 1)
            refPaginationInfo.current = {
                    firstPaginationPage: page,
                    lastPaginationPage: page + paginationLength - 1
            }
        }

        handlePageChange(page)
    }

    const handleShiftPagesLast = (): void => {
        setShiftPagesIndex(totalPages - paginationLength)
        refPaginationInfo.current = {
            firstPaginationPage: totalPages - paginationLength + 1,
            lastPaginationPage: totalPages
        }
        handlePageChange(totalPages)
    }

    const handleShiftPagesFirst = (): void => {
        setShiftPagesIndex(0)
        refPaginationInfo.current = {
            firstPaginationPage: 1,
            lastPaginationPage: paginationLength
        }

        handlePageChange(1)
    }

    return (
        <Pagination>
        <Pagination.First
            onClick={() => handleShiftPagesFirst()}
            disabled={currentPage === 1}
        />
        <Pagination.Prev
            onClick={() => handleShiftPagesBack(currentPage - 1)}
            disabled={currentPage === 1}
        />

        {[...Array(paginationLength)].map((_, index) => {
            return (
                <Pagination.Item
                    key={index + 1 + shiftPagesIndex}
                    active={index + 1 + shiftPagesIndex === currentPage}
                    onClick={() => handlePageChange(index + 1 + shiftPagesIndex)}
                >
                    {index + 1 + shiftPagesIndex}
                </Pagination.Item>
            )
        })}

        <Pagination.Next
            onClick={() => handleShiftPagesForward(currentPage + 1)}
            disabled={currentPage === totalPages}
        />
        <Pagination.Last
            onClick={() => handleShiftPagesLast()}
            disabled={totalPages === currentPage}
        />
    </Pagination>)
}