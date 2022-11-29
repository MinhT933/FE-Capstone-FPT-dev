import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        không tìm thấy dữ liệu cho &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.Vui lòng chọn lại các lựa
        chọn khác.
      </Typography>
    </Paper>
  );
}
