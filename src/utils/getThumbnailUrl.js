// reference: npm youtube-thumbnail-grabber

export default function getThumbnailUrl(videoid, quality) {
    switch (quality) {
        case 'max':
            return `https://i1.ytimg.com/vi/${videoid}/maxresdefault.jpg`
        case 'hq':
            return `https://i1.ytimg.com/vi/${videoid}/hqdefault.jpg`
        case 'mq':
            return `https://i1.ytimg.com/vi/${videoid}/mqdefault.jpg`
        case 'sd':
            return `https://i1.ytimg.com/vi/${videoid}/sddefault.jpg`
        case 'default':
            return `https://i1.ytimg.com/vi/${videoid}/default.jpg`
        default:
            return 'Please provide proper input for quality (max,hq,mq,sd,default)'
    }
}