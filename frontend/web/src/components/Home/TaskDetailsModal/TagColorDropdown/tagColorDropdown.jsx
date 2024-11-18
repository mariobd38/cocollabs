import { useState } from "react";

import "./tagColorDropdown.css";

import { updateTagInfo } from "../../../../api/Tags/updateTag";

export const TagColorDropdown = (props) => {
    const { allTagData,currentTaskTags,tagColorChangeDropdownRef,
        isDropdownOnRightSide,tagColorDropdownOpen,
        setTagColorButtonSelected,onTagColorButtonSelected,tagIndex
    } = props;

    const tagColors = [
        "#e65551",
        "#e76d89",
        "#dfa0ab",
        "#f68e32",
        "#dfaf2b",
        "#0ec9ad",
        "#0aa665",
        "#146882",
        "#0d6efd",
        "#8568af",
        "#c557ff",
        "#2c2d2f"
    ];

    const [hoverColorIndex, setHoverColorIndex] = useState(-1);

    const handleColorButtonClick = (color) => {
        setTagColorButtonSelected(true);
        onTagColorButtonSelected();
        updateTagInfo(
            null,
            allTagData,
            currentTaskTags,
            null,
            null,
            null,
            color,
            currentTaskTags[tagIndex],
        );
    }

    const tagColorChangeButtonHover = (color) => {
        const hex = color.slice(1);
        const decimal1 = parseInt(hex.substring(0,2), 16);
        const decimal2 = parseInt(hex.substring(2,4), 16);
        const decimal3 = parseInt(hex.substring(4,6), 16);

        const r = decimal1 - 25;
        const g = decimal2 - 25;
        const b = decimal3 - 25;
        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
        <div className="d-flex" ref={tagColorChangeDropdownRef}>
            <span
                className={`tcd-dropdown tcd-tag-options-dropdown ${tagColorDropdownOpen ? "open" : "" }`}
            >
                
                <div className={`tcd-model-dropdown-menu ${isDropdownOnRightSide ? 'tag-color-right' : 'tag-color-left'}`}
                
                >
                    <div className="d-flex flex-wrap gap-3 my-3 justify-content-center">
                        {tagColors.map((color, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoverColorIndex(index)}
                                onMouseLeave={() => setHoverColorIndex(-1)}
                                onClick={() => handleColorButtonClick(color)}
                                className="tcd-model-dropdown-color-circle"
                                style={{ backgroundColor: hoverColorIndex === index ? 
                                    tagColorChangeButtonHover(color) : color }}
                                        ></div>
                                    ))}
                    </div>
                </div>
            </span>
        </div>
    );
};
