import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import Backdrop from '@mui/material/Backdrop';
import Autocomplete from '@mui/material/Autocomplete';
import EditData from '../InsertData/editData';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// icons
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import { parse } from 'postcss';

const Swal = require('sweetalert2')

const kategori = [
    { label: 'Semua' },
    { label: 'Operasional' },
    { label: 'Anak Yatim' },
    { label: 'Baitul Mal' },
    { label: 'Renovasi' }
]


export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [tanggalDari, setTanggalDari] = React.useState('');
    const [tanggalSampai, setTanggalSampai] = React.useState('');
    const [kategoriValue, setKategoriValue] = React.useState(kategori[0]);
    const [saldoAkhir, setSaldoAkhir] = React.useState('');
    const [totalPemasukan, setTotalPemasukan] = React.useState('');
    const [totalPengeluaran, setTotalPengeluaran] = React.useState('');

    const [rows, setRows] = React.useState([]);
    const [idDana, setIdDana] = React.useState([]);

    const [hasData, setHasData] = React.useState(false);
    const [hasilData, setHasilData] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setEditOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleEdit = () => {
        setEditOpen(!editOpen);
    };



    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: 'noId',
            numeric: false,
            disablePadding: true,
            label: 'No',
        },
        {
            id: 'tanggalId',
            numeric: false,
            disablePadding: false,
            label: 'Tanggal',
        },
        {
            id: 'referensiId',
            numeric: false,
            disablePadding: false,
            label: 'Referensi',
        },
        {
            id: 'keteranganId',
            numeric: false,
            disablePadding: false,
            label: 'Keterangan',
        },
        {
            id: 'pemasukanId',
            numeric: true,
            disablePadding: false,
            label: 'Pemasukan',
        },
        {
            id: 'pengeluaranId',
            numeric: true,
            disablePadding: false,
            label: 'Pengeluaran',
        },
        {
            id: 'imgData',
            numeric: true,
            disablePadding: false,
            label: 'Attachment',
        }
    ];
    var selectedCount;
    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const EnhancedTableToolbar = (props) => {
        const { numSelected } = props;

        const deleteData = () => {
            Swal.fire({
                title: 'Yakin ingin menghapus data?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yakin',
                denyButtonText: `Tidak`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    for (let i = 0; i <= selected.length; i++) {

                        //console.log(idDana[selected[i]-1])
                        axios
                            .post(
                                'http://localhost:4000/danaDelete', {
                                id: idDana[selected[i] - 1],
                            })
                            .then(function (response) {

                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Data berhasil dihapus',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                window.location.reload(false)

                            })
                            .catch(function (error) {
                                Swal.fire('Data tidak berhasil dihapus', '', 'error')
                                console.error(error);
                            });
                    }

                } else if (result.isDenied) {
                    Swal.fire('Data tidak jadi dihapus', '', 'info')
                }
            })
        }

        return (
            <>
                {editOpen ?
                    (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={editOpen}
                        >
                            <div className="flex flex-col items-end space-y-2">
                                <div className="mr-[1%] pr-[2%]">
                                    <Button color='error' variant="contained" className="m-[20%] p-[20%]" size='large' sx={{ width: 100 }} onClick={handleClose}>Cancel</Button>
                                </div>
                                <EditData propData={rows[selected - 1]} />
                            </div>
                        </Backdrop>

                    ) : null
                }

                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    {numSelected > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Data
                        </Typography>
                    )}

                    {numSelected > 1 ? (
                        <Tooltip title="Delete">
                            <IconButton onClick={() => deleteData()}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                    ) : null}
                    {(numSelected > 0 && numSelected < 2) ? (
                        <>
                            <Tooltip title="Info">
                                <IconButton onClick={handleToggle}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton onClick={handleEdit}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => deleteData()}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )
                        : (
                            <>
                            </>
                        )}
                </Toolbar>
            </>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    React.useEffect(() => {

        getDataDana()

    }, []);

    const getDataDana = async () => {
        axios
            .get(
                "http://localhost:4000/dana"
            )
            .then(function (response) {

                console.log(response.data);

                setHasilData(response.data);
                if (response.data.length === 0) {

                    setHasData(false);

                } else {

                    setHasData(true);

                }

            })
            .catch(function (error) {
                // alert("Can't found your team")
                console.error(error);
            });
    }

    let rowsRaw = [];
    let hasImg = [];

    if (hasData) {
        setHasData(false);
        let nomor = 0;
        let saldo = 0;
        let idss = [];
        let totPemasukan = 0;
        let totPengeluaran = 0;
        for (let i = 0; i < hasilData.length; i++) {

            nomor += 1;
            console.log(hasilData[i].referensi[0])

            if (hasilData[i].referensi[0] === 'A') {
                saldo += parseInt(hasilData[i].nominal);
                totPemasukan += parseInt(hasilData[i].nominal);
                rowsRaw.push({

                    noId: nomor,
                    tanggalId: hasilData[i].tanggal,
                    referensiId: hasilData[i].referensi,
                    kategoriId: hasilData[i].kategori,
                    keteranganId: hasilData[i].keterangan,
                    pemasukanId: hasilData[i].nominal,
                    pengeluaranId: null,
                    idData: hasilData[i]._id,
                    imgData: hasilData[i].gambarBukti

                });

                idss.push(hasilData[i]._id);

            } else {
                saldo -= parseInt(hasilData[i].nominal);
                totPengeluaran += parseInt(hasilData[i].nominal)

                rowsRaw.push({

                    noId: nomor,
                    tanggalId: hasilData[i].tanggal,
                    referensiId: hasilData[i].referensi,
                    kategoriId: hasilData[i].kategori,
                    keteranganId: hasilData[i].keterangan,
                    pemasukanId: null,
                    pengeluaranId: hasilData[i].nominal,
                    idData: hasilData[i]._id,
                    imgData: hasilData[i].gambarBukti,

                });


                idss.push(hasilData[i]._id);

            }

            if (hasilData[i].gambarBukti.data !== 404) {
                //hasImg.push(DescriptionIcon);
                hasImg.push("ada");
            } else {
                hasImg.push(null);
            }

        }

        setTotalPemasukan(totPemasukan);
        setTotalPengeluaran(totPengeluaran);
        setSaldoAkhir(saldo);
        setRows(rowsRaw);
        setIdDana(idss);

    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.noId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, noId) => {
        const selectedIndex = selected.indexOf(noId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, noId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
        // for (let i = 0; i < newSelected.length; i++) {
        //     console.log(rows[newSelected[i]-1].idData)
        // }

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (noId) => selected.indexOf(noId) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const onDateFilter = (e) => {
        e.preventDefault();
        if (tanggalDari === '' || tanggalSampai === '') {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Jarak tanggal tidak boleh kosong',
                showConfirmButton: false,
                timer: 1500
            });

        } else {
            rowsRaw = []

            const y = new Date(tanggalDari);
            const z = new Date(tanggalSampai);
            let x;
            let idss = [];


            let nomor = 0;
            let totPemasukan = 0;
            let totPengeluaran = 0;
            for (let i = 0; i < hasilData.length; i++) {

                nomor += 1;
                x = new Date(hasilData[i].tanggal);

                if (x >= y && x <= z) {
                    if (hasilData[i].kategori === kategoriValue.label || kategoriValue.label === 'Semua') {

                        if (hasilData[i].referensi[0] === 'A') {
                            totPemasukan += parseInt(hasilData[i].nominal);
                            rowsRaw.push({

                                noId: nomor,
                                tanggalId: hasilData[i].tanggal,
                                referensiId: hasilData[i].referensi,
                                keteranganId: hasilData[i].keterangan,
                                pemasukanId: hasilData[i].nominal,
                                pengeluaranId: null,
                                idData: hasilData[i]._id,
                                imgData: hasilData[i].gambarBukti

                            });


                            idss.push(hasilData[i]._id);
                        } else {

                            totPengeluaran += parseInt(hasilData[i].nominal);
                            rowsRaw.push({

                                noId: nomor,
                                tanggalId: hasilData[i].tanggal,
                                referensiId: hasilData[i].referensi,
                                keteranganId: hasilData[i].keterangan,
                                pemasukanId: null,
                                pengeluaranId: hasilData[i].nominal,
                                idData: hasilData[i]._id,
                                imgData: hasilData[i].gambarBukti

                            });


                            idss.push(hasilData[i]._id);

                        }
                    }
                }
            }

            document.getElementById('judul-laporan').style.display = 'none';
            document.getElementById('kategori-laporan').style.display = 'none';
            document.getElementById('tanggal-laporan').style.display = 'none';

            if (tanggalDari === tanggalSampai) {

                document.getElementById('judul-laporan').style.display = 'flex';
                document.getElementById('tanggal-laporan').style.display = 'flex';

                document.getElementById('judul-laporan').innerHTML = 'Laporan Keuangan Masjid Al-Muhajirin';
                document.getElementById('tanggal-laporan').innerHTML = new Date(tanggalDari).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' });

                if (kategoriValue.label !== 'Semua') {
                    document.getElementById('kategori-laporan').style.display = 'flex';
                    document.getElementById('kategori-laporan').innerHTML = kategoriValue.label;
                }

            } else {

                document.getElementById('judul-laporan').style.display = 'flex';
                document.getElementById('judul-laporan').innerHTML = 'Laporan Keuangan Masjid Al-Muhajirin';

                document.getElementById('tanggal-laporan').style.display = 'flex';
                let tanggalTarget = new Date(tanggalSampai).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' });
                let lastMonth = new Date(tanggalDari);
                lastMonth.setMonth(lastMonth.getMonth() + 1);
                lastMonth.setDate(-0);
                lastMonth = new Date(lastMonth).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' });
                if (new Date(tanggalDari).toLocaleDateString('id-ID', { day: 'numeric' }) === '1' && lastMonth === tanggalTarget) {

                    document.getElementById('tanggal-laporan').innerHTML = 'Bulan '
                        + new Date(tanggalDari).toLocaleDateString('id-ID', { month: 'long' });

                } else {

                    document.getElementById('tanggal-laporan').innerHTML =
                        new Date(tanggalDari).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' })
                        + ' s/d '
                        + new Date(tanggalSampai).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' });

                }

                if (kategoriValue.label !== 'Semua') {
                    document.getElementById('kategori-laporan').style.display = 'flex';
                    document.getElementById('kategori-laporan').innerHTML = kategoriValue.label;
                }
            }

            setTotalPemasukan(totPemasukan);
            setTotalPengeluaran(totPengeluaran);
            setRows(rowsRaw);
            setIdDana(idss);

        }
    }



    return (
        <>
            {console.log(hasImg)}
            <form onSubmit={onDateFilter}>
                <div className="flex flex-row pb-5">
                    <div className="space-x-8">
                        <TextField
                            label="Dari"
                            type="date"
                            id="outlined-size-small"
                            value={tanggalDari}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => setTanggalDari(e.target.value)}
                        />
                        <TextField
                            label="Sampai"
                            type="date"
                            id="outlined-size-small"
                            value={tanggalSampai}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => setTanggalSampai(e.target.value)}
                        />
                    </div>
                    <div className="pl-5 space-x-4 flex-row flex">
                        <Autocomplete
                            disablePortal
                            value={kategoriValue}
                            onChange={(e, newVal) => setKategoriValue(newVal)}
                            options={kategori}
                            size="small"
                            sx={{ width: 175 }}
                            renderInput={(params) => <TextField {...params} label="Kategori" />}

                        />
                        <button
                            key="terapkan"
                            className="no-underline text-white rounded-lg font-semibold  active:bg-gray-500 bg-black py-2 px-4 transition duration-75 ease-in-out"
                            type="submit"
                        >
                            Terapkan
                        </button>
                        <button
                            key="reset"
                            type="button"
                            className="no-underline text-white rounded-lg font-semibold  active:bg-gray-500 bg-black py-2 px-4 transition duration-75 ease-in-out"
                            onClick={() => window.location.reload(false)}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
            <div className="pb-2 space-x-10">
                <TextField
                    disabled
                    id="filled-disabled"
                    label="Saldo Akhir"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(saldoAkhir)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div id="judul-laporan" className="justify-center text-3xl font-bold m-2 pt-2 hidden">

            </div>
            <div id="kategori-laporan" className="hidden justify-center text-3xl font-bold m-2 pt-2">

            </div>
            <div id="tanggal-laporan" className="hidden justify-center text-3xl font-bold m-2 pt-2">

            </div>

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.noId);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.noId)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.noId}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.noId}
                                                </TableCell>
                                                <TableCell align="left">{row.tanggalId}</TableCell>
                                                <TableCell align="left" style={{ width: 10 }}>{row.referensiId}</TableCell>
                                                <TableCell align="left">{row.keteranganId}</TableCell>
                                                <TableCell align="right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.pemasukanId)}</TableCell>
                                                <TableCell align="right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.pengeluaranId)}</TableCell>
                                                <TableCell align="right" style={{ width: 10 }}>{row.imgData.data === 404 ? null : <DescriptionIcon />}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>
            <div className="flex justify-end pb-2 space-x-5">
                <TextField
                    disabled
                    id="filled-disabled"
                    label="Pemasukan"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPemasukan)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    disabled
                    id="filled-disabled"
                    label="Pengeluaran"
                    value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPengeluaran)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            {(selected.length === 0 || rows[selected[0] - 1].imgData.data === 404) ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <h1>No Image</h1>
                </Backdrop>) : (

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <div className="w-1/3">
                        <img src={`data:image/png;base64,${rows[selected[0] - 1].imgData.data}`}></img>
                    </div>
                </Backdrop>

            )}
        </>
    );
}
