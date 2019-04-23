import "./style.css"
import imgUrl from "./img.png"
import { cube} from '../untils/math'
// import Styles from 'style-loader!css-loader?modules!./styles.css';
// 创建组件
function createComponent(){
    var element = document.createElement('div');
    element.innerHTML = `5 is equal to ${cube(5)}`;
    return element; 
}
// 创建图片元素
function createImg(){
    var imgBox = document.createElement('img');
    imgBox.src = imgUrl;
    return imgBox;
}
// 将创建的元素插入的 body 中
document.body.append(createComponent(),createImg());