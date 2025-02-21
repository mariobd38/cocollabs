function getAvatars() {
    const avatars = import.meta.glob('@/assets/avatars/*.svg', { eager: true });
    const avatarList = Object.entries(avatars)
        .sort(([a], [b]) => {
            // Extract numbers from file names to ensure correct order
            const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
            return numA - numB;
        })
        .map(([path, avatar]) => ({
            name: path.split('/').pop(), // Extract file name
            svg: avatar.default, // Actual SVG content
        }));
    return avatarList;
}

export { getAvatars };