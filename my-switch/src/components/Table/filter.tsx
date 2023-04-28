import { Search } from "@mui/icons-material";
import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { WHITE_COLOR } from "../../utils/constants";
import { RoundedButton } from "../Common";

export interface ITableFilterProps {
  title: {
    label: string;
    to?: string;
  };
  ctaLabel?: string;
  onCTAClicked?: Function;
  onChanged : (search: string)=>void;
}

const TableFilter = ({ title, ctaLabel, onCTAClicked, onChanged }: ITableFilterProps) => {
  return (
    <StyledBox
      style={{
        minHeight: 56,
        background: WHITE_COLOR,
        marginTop: 16,
        alignItems: "center",
        marginBottom: 32
      }}
    >
        <NavLink
          style={{
            color: "#000000",
            cursor: "pointer",
            textDecoration: "none",
            flex:1
          }}
          to={title.to || "#"}
        >
          {title.label}
        </NavLink>

      <div style={{flexDirection:"row", display:'flex', justifyContent:"space-between"}}>

        <SearchContainer>
          <SearchInput  placeholder="What are you searching for?" onChange={(event)=>{
              onChanged && onChanged(event.target.value);
          }} />
          <Search style={{ color: "#aaa" }} />
        </SearchContainer>

        {ctaLabel && onCTAClicked && (
          <RoundedButton
            style={{marginLeft: 32}}
            onClick={() => onCTAClicked()}
            variant="contained"
          >
            {ctaLabel}
          </RoundedButton>
        )}
      </div>
    </StyledBox>
  );
};

/**
 * ------------------
 * STYLED COMPONENTS
 * -----------------
 */

const StyledBox = styled('div')`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 6px 20px 0 rgb(193 207 217 / 20%);
  padding: 16px;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled('input')`
  color: #646d82;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 450;
  padding-left: 8px;
  font-size: 15px;
  min-width: 210px;
`;

const SearchContainer = styled('div')`
  background-color: #fff;
  max-width: 280px;
  padding: 8px;
  display: flex;
  border-radius: 20px;
  border: 1px solid #e6eaf0;
`;

export default TableFilter;
