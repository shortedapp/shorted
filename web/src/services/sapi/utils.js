export const slice =(data, window) => {
    const slice_map = {
        hourly: {
            d: 24,
            w: 168,
            m: 672,
            y: 8064,
            y3: 24192,
        },
        daily: {
            d: 8,
            w: 28,
            m: 180,
            y: 365,
            y3: 1095,
        },
    };
    return data.slice(-1 * slice_map.daily[window], -1)
}

