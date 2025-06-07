import React, { useState, useEffect } from "react";

const MyCodeforces = () => {
    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [randomProblem, setRandomProblem] = useState(null);
    const [indexes, setIndexes] = useState([]); // Unique indexes for filtering
    const [selectedIndexes, setSelectedIndexes] = useState([]); // Selected indexes

    // Fetch the problemset JSON when the component mounts
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch("/my-apphub/app-data/MyCodeforces/problemset.json");
                const data = await response.json();
                setProblems(data.problems); // Set the problem list

                // Extract unique indexes for the filter
                const uniqueIndexes = [...new Set(data.problems.map((problem) => problem.index))];
                setIndexes(uniqueIndexes.sort());
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        };

        fetchProblems();
    }, []);

    // Update filtered problems whenever selectedIndexes changes
    useEffect(() => {
        if (selectedIndexes.length > 0) {
            const filtered = problems.filter((problem) => selectedIndexes.includes(problem.index));
            setFilteredProblems(filtered);
        } else {
            setFilteredProblems(problems); // If no filters are selected, show all problems
        }
    }, [selectedIndexes, problems]);

    // Function to handle filter selection
    const handleCheckboxChange = (index) => {
        if (selectedIndexes.includes(index)) {
            setSelectedIndexes(selectedIndexes.filter((selected) => selected !== index));
        } else {
            setSelectedIndexes([...selectedIndexes, index]);
        }
    };

    // Function to pick a random problem from the filtered list
    const getRandomProblem = () => {
        if (filteredProblems.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredProblems.length);
            setRandomProblem(filteredProblems[randomIndex]);
        } else {
            console.error("No problems available based on selected filters.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                {/* Filters Section */}
                <div className="col-md-8">
                    <div className="p-3 bg-white shadow rounded">
                        <h4>Filters</h4>
                        <hr />
                        <h5>Index:</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {indexes.map((index) => (
                                <div key={index} className="form-check">
                                    <input
                                        type="checkbox"
                                        id={`filter-${index}`}
                                        className="form-check-input"
                                        checked={selectedIndexes.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label htmlFor={`filter-${index}`} className="form-check-label">
                                        {index}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Problem Display Section */}
                <div className="col-md-4">
                    <div className="p-3 bg-white shadow rounded">
                        <h4>Problem Display</h4>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={getRandomProblem}
                            disabled={filteredProblems.length === 0}
                        >
                            Get Random Problem
                        </button>
                        <hr />
                        {randomProblem ? (
                            <div className="p-3 border rounded bg-light text-start">
                                <h3>
                                    <a
                                        href={`https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {randomProblem.name}
                                    </a>
                                </h3>
                                <p className="mb-2">
                                    <strong>Contest ID:</strong> {randomProblem.contestId}{" "}
                                    <strong>Index:</strong> {randomProblem.index}
                                </p>
                                <p className="mb-2">
                                    <strong>Difficulty:</strong>{" "}
                                    {randomProblem.points ? randomProblem.points : "N/A"}
                                </p>
                                <p className="mb-2">
                                    <strong>Tags:</strong>{" "}
                                    {randomProblem.tags && randomProblem.tags.length > 0
                                        ? randomProblem.tags.join(", ")
                                        : "No tags available"}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted">Click "Get Random Problem" to display a problem!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCodeforces;
