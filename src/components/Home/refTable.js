import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';

import axios from "axios";

const Swal = require('sweetalert2')

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const { title } = props;

    return (
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
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function DenseTable() {
    const [selected, setSelected] = React.useState([]);
    const [hasDataRef, sethasDataRef] = React.useState(false);
    const [hasilDataRef, sethasilDataRef] = React.useState(null);
    const [hasData, setHasData] = React.useState(false);
    const [hasilData, setHasilData] = React.useState(null);
    const [rowsPendapatan, setRowsPendapatan] = React.useState([]);
    const [rowsPengeluaran, setRowsPengeluaran] = React.useState([]);
    const [totalPemasukan, setTotalPemasukan] = React.useState("");
    const [totalPengeluaran, setTotalPengeluaran] = React.useState("");

    const [tanggalDari, setTanggalDari] = React.useState('');
    const [tanggalSampai, setTanggalSampai] = React.useState('');

    React.useEffect(() => {
        getDataReferensi();
        getDataDana();
    }, []);

    var A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getDataReferensi = async () => {
        axios
            .get(
                "http://localhost:4000/dataRef"
            )
            .then(function (response) {

                console.log(response.data);

                sethasilDataRef(response.data);
                if (response.data.length === 0) {

                    sethasDataRef(false);

                } else {

                    sethasDataRef(true);

                }
            })
            .catch(function (error) {
                // alert("Can't found your team")
                console.error(error);
            });
    }

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
                console.error(error);
            });
    }

    function createData(referensi, keterangan, nominal) {
        return { referensi, keterangan, nominal };
    }

    var rowsPendapatanRaw = [];
    var rowsPengeluaranRaw = [];

    if (hasData) {
        setHasData(false)
        for (let i = 0; i < hasilData.length; i++) {
            if (hasilData[i].referensi === 'A.1') {
                A[0] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.1') {
                A[1] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.2') {
                A[2] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.3') {
                A[3] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.4') {
                A[4] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.5') {
                A[5] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.6') {
                A[6] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.7') {
                A[7] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.8') {
                A[8] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.9') {
                A[9] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.2.10') {
                A[10] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.3.1') {
                A[11] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.3.2') {
                A[12] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.3.3') {
                A[13] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.4.1') {
                A[14] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'A.5.1') {
                A[15] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.1') {
                B[0] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.2') {
                B[1] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.3') {
                B[2] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.4') {
                B[3] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.5') {
                B[4] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.6') {
                B[5] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.7') {
                B[6] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.8') {
                B[7] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.9') {
                B[8] += parseInt(hasilData[i].nominal, 10);
            } else if (hasilData[i].referensi === 'B.10') {
                B[9] += parseInt(hasilData[i].nominal, 10);
            }
        }

        var pemasukan = 0;
        var pengeluaran = 0;

        for (let i = 0; i < hasilDataRef.length; i++) {
            if (hasilDataRef[i].referensi[0] !== 'B') {
                rowsPendapatanRaw.push(createData(
                    hasilDataRef[i].referensi,
                    hasilDataRef[i].deskripsi,
                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(A[i])
                ));
                pemasukan += parseInt(A[i]);
            } else {
                rowsPengeluaranRaw.push(createData(
                    hasilDataRef[i].referensi,
                    hasilDataRef[i].deskripsi,
                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(B[i - 16])
                ));
                pengeluaran += parseInt(B[i - 16]);
            }
        }

        setTotalPemasukan(pemasukan);
        setTotalPengeluaran(pengeluaran);
        setRowsPendapatan(rowsPendapatanRaw);
        setRowsPengeluaran(rowsPengeluaranRaw);
    }

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

            rowsPendapatanRaw = []
            rowsPengeluaranRaw = []

            A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            const y = new Date(tanggalDari);
            const z = new Date(tanggalSampai);
            var x;

            for (let i = 0; i < hasilData.length; i++) {

                x = new Date(hasilData[i].tanggal);

                if (x >= y && x <= z) {
                    if (hasilData[i].referensi === 'A.1') {
                        A[0] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.1') {
                        A[1] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.2') {
                        A[2] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.3') {
                        A[3] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.4') {
                        A[4] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.5') {
                        A[5] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.6') {
                        A[6] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.7') {
                        A[7] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.8') {
                        A[8] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.9') {
                        A[9] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.2.10') {
                        A[10] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.3.1') {
                        A[11] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.3.2') {
                        A[12] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.3.3') {
                        A[13] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.4.1') {
                        A[14] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'A.5.1') {
                        A[15] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.1') {
                        B[0] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.2') {
                        B[1] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.3') {
                        B[2] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.4') {
                        B[3] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.5') {
                        B[4] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.6') {
                        B[5] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.7') {
                        B[6] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.8') {
                        B[7] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.9') {
                        B[8] += parseInt(hasilData[i].nominal, 10);
                    } else if (hasilData[i].referensi === 'B.10') {
                        B[9] += parseInt(hasilData[i].nominal, 10);
                    }
                }
            }

            var pemasukan = 0;
            var pengeluaran = 0;
            for (let i = 0; i < hasilDataRef.length; i++) {
                if (hasilDataRef[i].referensi[0] !== 'B') {
                    rowsPendapatanRaw.push(createData(
                        hasilDataRef[i].referensi,
                        hasilDataRef[i].deskripsi,
                        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(A[i])
                    ));
                    pemasukan += parseInt(A[i]);
                } else {
                    rowsPengeluaranRaw.push(createData(
                        hasilDataRef[i].referensi,
                        hasilDataRef[i].deskripsi,
                        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(B[i - 16])
                    ));
                    pengeluaran += parseInt(B[i - 16]);
                }
            }

            setTotalPemasukan(pemasukan);
            setTotalPengeluaran(pengeluaran);
            setRowsPendapatan(rowsPendapatanRaw);
            setRowsPengeluaran(rowsPengeluaranRaw);

        }
    }

    return (
        <>
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
                    <div className="pl-5 space-x-4">
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
            <div className="pb-2 space-x-5">
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
            <div className="pb-4">
                <TableContainer component={Paper}>
                    <EnhancedTableToolbar numSelected={selected.length} title="A. Pendapatan" />
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">REFERENSI</TableCell>
                                <TableCell align="left">KETERANGAN</TableCell>
                                <TableCell align="right">NOMINAL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsPendapatan.map((row) => (
                                <TableRow
                                    key={row.referensi}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.referensi}
                                    </TableCell>
                                    <TableCell align="left">{row.keterangan}</TableCell>
                                    <TableCell align="right">{row.nominal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="pb-4">
                <TableContainer component={Paper}>
                    <EnhancedTableToolbar numSelected={selected.length} title="B. Pengeluaran" />
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">REFERENSI</TableCell>
                                <TableCell align="left">KETERANGAN</TableCell>
                                <TableCell align="right">NOMINAL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsPengeluaran.map((row) => (
                                <TableRow
                                    key={row.referensi}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.referensi}
                                    </TableCell>
                                    <TableCell align="left">{row.keterangan}</TableCell>
                                    <TableCell align="right">{row.nominal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </>
    );
}
