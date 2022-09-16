import React, { FC } from "react";
import {BackgroundImage, DirectoryItemContainer, Body} from "./directory-item.styles";
import { useNavigate } from 'react-router-dom';
import { DirectoryCategory } from '../directory/'

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
const { imageUrl, title, route } = category;
const navigate = useNavigate();
const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      {/* <img src="" alt="" /> */}
      {/* custom style for inserting image from div */}
      <BackgroundImage
        // passing the image props for using at the styling 
        imageUrl={imageUrl} 
        // loading="lazy"    
        // style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  ); 
};

export default DirectoryItem;
