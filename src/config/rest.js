export default {
    DATA: '/data',
    UPLOAD: '/uploads',
    CHECK: '/check',
    SAVE: '/save',
    LECTURE: '/lecture',
    FILEDATA: (id) => {
        return `/data/${id}`
    },
    SEARCH: (q) => {
        return `/search?q=${q}`
    }
}