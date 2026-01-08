import { useState } from "react"
import type { AdditiveV2 } from "../Services/AdditiveV2/AdditiveServicesV2"
import { useNavigate } from "react-router-dom"

type AdditiveOverallProps = {
    selectedAdditive: AdditiveV2
}
export default function AdditiveOverall({selectedAdditive} : AdditiveOverallProps) {
    const navigate = useNavigate();

    return (
        <div className="border-3 rounded border-[rgb(77,16,39)] p-2 bg-gray-200 text-black">
            <div>
                <p><a className="text-blue-500!"target="_blank" href={selectedAdditive?.AdditiveURL}>{selectedAdditive?.AdditiveURL}</a></p>
                <p>{selectedAdditive?.AdditiveDescription}</p>
            </div>
        </div>
    )
}