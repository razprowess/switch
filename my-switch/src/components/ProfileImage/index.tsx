import { styled, Tooltip} from '@mui/material';
import styles from "./index.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgressWithLabel from '../CircularProgressWithLabel';


export interface IProfileImage {
  type?: "circle" | "oval" | "curve";
  size?: string;
  width?: string;
  height?: string;
  src?: string;
  canChange?: boolean;
  callback?: (event: any) => void;
  uploadProgress?: number;
}

const ImgWrapper = styled("img")`
  width: ${(props: IProfileImage) =>
    props.width ? `${props.width}` : `${props.size}`};
  height: ${(props: IProfileImage) =>
    props.height ? `${props.height}` : `${props.size}`};
  border-radius: ${(props: IProfileImage) =>
    props.type === "circle" ? "50%" : props.type === "oval" ? "50rem" : "16px"};
  border: solid 1px#2196f3;
`;

const ProfileImage = (props: IProfileImage) => {
  const {
    type,
    size,
    width,
    height,
    src,
    canChange,
    uploadProgress,
    callback,
  } = props;

  const onChange = (event: any) => {
    if (callback) {
      callback(event);
    }
  };

  return (
    <div className={styles.wrapper}>
      {!canChange && (
        <ImgWrapper
          src={src}
          type={type}
          size={size}
          height={height}
          width={width}
        />
      )}
      {canChange && (
        <label className={styles.label} htmlFor="fileUpload">
          <ImgWrapper
            src={src}
            type={type}
            size={size}
            height={height}
            width={width}
          />
          <div className={styles.uploadIcon}>
            <Tooltip title='upload image'>
            <AddCircleIcon color="primary" sx={{ "&:hover": { cursor: 'pointer'}}}/>
            </Tooltip>

          </div>
          <input
            id="fileUpload"
            type="file"
            onChange={onChange}
            className={styles.input}
          />
        </label>
      )}
      <CircularProgressWithLabel value={uploadProgress || 0} />
    </div>
  );
};

export default ProfileImage;
