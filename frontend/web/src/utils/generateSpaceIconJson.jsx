function generateSpaceIconJson(icon) {
    const spaceIconProps = icon.props;
    return {
        background: spaceIconProps.bg,
        color: spaceIconProps.color,
        radius: spaceIconProps.radius,
        // width: spaceIconProps.w,
        children: spaceIconProps.children.props || spaceIconProps.children
    }
}
export {generateSpaceIconJson}