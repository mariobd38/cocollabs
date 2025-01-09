import React from "react";

function generateSpaceIconJson(icon) {
    // If icon is a React element, get its props
    const spaceIconProps = React.isValidElement(icon) ? icon.props : icon;
    
    // Get the children element (which should be the IconsFilled component)
    const iconChild = spaceIconProps.children;
    
    let childrenData = null;
    if (React.isValidElement(iconChild)) {
        // For SVG elements, we need to capture all SVG-related props including paths
        childrenData = {
            type: 'svg',
            props: {
                xmlns: "http://www.w3.org/2000/svg",
                width: iconChild.props?.width || 24,
                height: iconChild.props?.height || 24,
                viewBox: iconChild.props?.viewBox || "0 0 24 24",
                fill: iconChild.props?.fill || '#fafafa',
                className: iconChild.props?.className,
                // We need to capture the path data here
                d: iconChild.props?.children?.props?.d,
                paths: iconChild.props?.children?.filter(child => child.type === 'path')?.map(path => path.props)
            }
        };
    }

    return {
        background: spaceIconProps.bg || null,
        color: spaceIconProps.color || null,
        radius: spaceIconProps.radius || null,
        children: childrenData
    };
}


export { generateSpaceIconJson };