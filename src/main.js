const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //正则表达式删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="iconClose">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
                window.open(node.url)
            })
            //防止点击 删除 图标会跳转，做一个阻止冒泡
        $li.on('click', '.iconClose', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })

    })

}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址:')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    hashMap.push({ logo: simplifyUrl(url)[0], logoType: 'text', url: url })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})