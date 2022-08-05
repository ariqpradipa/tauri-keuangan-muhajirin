import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";

const Swal = require('sweetalert2')


export default function InsertData(props) {

    const { propData } = props;

    const [propState, setPropState] = React.useState(propData);
    const [idValue, setIdValue] = React.useState(propData.idData);
    const [tanggalValue, setTanggalValue] = React.useState(propData.tanggalId);
    const [refValue, setRefValue] = React.useState(propData.referensiId);
    const [refInput, setRefInput] = React.useState("");
    const [kategoriValue, setKategoriValue] = React.useState(propData.kategoriId);
    const [ketValue, setKetValue] = React.useState(propData.keteranganId);
    const [nominalValue, setNominalValue] = React.useState(propData.pemasukanId === null ? parseInt(propData.pengeluaranId) : parseInt(propData.pemasukanId));
    const [selectedFile, setSelectedFile] = React.useState(propData.imgData.data === 404 ? [] : propData.imgData);
    const [refState, setRefState] = React.useState(true);

    const refHandle = (newRef) => {

        setRefInput(newRef);

        if (newRef[0] === 'A') {

            setRefState(true);

        } else if (newRef[0] === 'B') {

            setRefState(false);
        }

    }

    const onSubmitForm = (e) => {

        e.preventDefault();
        if (tanggalValue === "" || ketValue === "") {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tanggal atau Keterangan tidak dapat kosong',
                showConfirmButton: false,
                timer: 1500
            });

            return;
        }

        if (nominalValue === "") {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Jumlah Nominal tidak dapat kosong',
                showConfirmButton: false,
                timer: 1500
            });

            return;

        }

        let referensiValue;
        if (refValue.label === undefined) {
            referensiValue = refValue.split(" ");
        } else {

            referensiValue = refValue.label.split(" ");

        }

        if (selectedFile.name !== undefined) {

            let danaData = new FormData();
            danaData.append("id", idValue);
            danaData.append("tanggal", tanggalValue);
            danaData.append("referensi", referensiValue[0]);
            danaData.append("kategori", kategoriValue.label === undefined ? kategoriValue : kategoriValue.label);
            danaData.append("keterangan", ketValue);
            danaData.append("imgBukti", selectedFile);
            danaData.append("nominal", nominalValue);
            console.log(idValue);
            var config = {
                method: 'post',
                url: 'http://localhost:4000/danaUpdateImage',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: danaData
            };
            axios(config)
                .then(function (response) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data berhasil ditambahkan',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    window.location.reload();

                    return;
                })
                .catch(function (error) {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Gagal memasukkan data',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    console.error(error);
                });
        } else {

            console.log("masuk default")
            axios
                .post(
                    "http://localhost:4000/danaUpdateDefault", {

                    id: idValue,
                    tanggal: tanggalValue,
                    referensi: referensiValue[0],
                    kategori: kategoriValue.label === undefined ? kategoriValue : kategoriValue.label,
                    keterangan: ketValue,
                    nominal: nominalValue

                })
                .then(function (response) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data berhasil ditambahkan',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    window.location.reload();

                    return;

                })
                .catch(function (error) {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Gagal memasukkan data',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    console.error(error);
                });
        }

    }

    const handleChangeFile = (e) => {
        e.preventDefault();

        var imagefile = document.querySelector('#fileInput');
        setSelectedFile(imagefile.files[0]);

    }

    return (
        <>
            <div className="bg-white m-10 p-8 rounded-md">
                <div className="flex flex-col">
                    <h1 className="font-sans font-bold text-left text-2xl pb-5 text-black">
                        Pengeditan Data
                    </h1>
                </div>
                <form onSubmit={onSubmitForm}>
                    <div className="flex gap-2">
                        <TextField
                            id="outlined-basic"
                            label="Tanggal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="date"
                            value={tanggalValue}
                            onChange={e => setTanggalValue(e.target.value)}
                        />
                        <Autocomplete
                            disablePortal
                            value={refValue}
                            onChange={(e, newVal) => setRefValue(newVal)}
                            inputValue={refInput}
                            onInputChange={(e, newInputVal) => refHandle(newInputVal)}
                            id="combo-box-demo"
                            options={referensi}
                            sx={{ width: 390 }}
                            renderInput={(params) => <TextField {...params} label="Referensi" />}

                        />
                        <Autocomplete
                            disablePortal
                            value={kategoriValue}
                            onChange={(e, newVal) => setKategoriValue(newVal)}
                            id="combo-box-demo"
                            options={kategori}
                            sx={{ width: 175 }}
                            renderInput={(params) => <TextField {...params} label="Kategori" />}

                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Keterangan"
                            multiline
                            maxRows={5}
                            sx={{ width: 300 }}
                            value={ketValue}
                            onChange={e => setKetValue(e.target.value)}
                        />

                        {refState ?
                            <FormControl sx={{ width: 220 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Pemasukan</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Pemasukan"
                                    value={nominalValue}
                                    onChange={e => setNominalValue(e.target.value)}
                                />
                            </FormControl> :
                            <FormControl sx={{ width: 220 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Pengeluaran</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Pengeluaran"
                                    value={nominalValue}
                                    onChange={e => setNominalValue(e.target.value)}
                                />
                            </FormControl>
                        }

                        <Button key="submit" type="submit" variant="contained">Submit</Button>

                    </div>
                    <div className="flex pt-2 space-x-2 flex-col">
                        <Button variant="contained" component="label" type="button" sx={{ width: 200 }}>
                            <AttachFileIcon /> Upload Dokumen
                            <input hidden accept="image/*" type="file" id="fileInput" onChange={handleChangeFile} />
                        </Button>
                        <div className="flex">
                            {
                                selectedFile.length !== 0 && selectedFile.name === undefined ?
                                    (
                                        <div className="w-1/3">
                                            <img src={`data:image/png;base64,${selectedFile.data}`}></img>
                                        </div>
                                    ) : <h1 className="font-mono text-blue-400">{selectedFile.name}</h1>
                            }
                            {selectedFile.length === 0 ? null : <Button onClick={() => setSelectedFile([])}><ClearIcon /></Button>}
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

const referensi = [
    { label: 'A.1 Saldo Tahun Sebelumnya' },
    { label: "A.2.1 Tromol Jum'at" },
    { label: 'A.2.2 Kencleng Sedekah Subuh & Harian' },
    { label: 'A.2.3 Tromol Teraweh' },
    { label: 'A.2.4 Tromol Idul Fitri' },
    { label: 'A.2.5 Tromol Idul Adha' },
    { label: 'A.2.6 Tromol Yatim' },
    { label: 'A.2.7 Tromol Baitul Maal' },
    { label: 'A.2.8 Donatur Bulanan (Kartu)' },
    { label: 'A.2.9 Infaq & Sedekah' },
    { label: 'A.2.10 Bazis Ramadhan' },
    { label: 'A.3.1 Infaq Tablig Akbar' },
    { label: 'A.3.2 Gema Ramadhan' },
    { label: 'A.3.3 Infaq Renovasi' },
    { label: 'A.4.1 Proposal' },
    { label: 'A.5.1 Iuran anggota layanan kedukaan' },

    { label: 'B.1 Operasional Keskretariatan' },
    { label: 'B.2 Operasional Kebendaharaan' },
    { label: 'B.3 Bidang Usaha' },
    { label: 'B.4 Bidang Peribadatan dan PHBI' },
    { label: 'B.5 Bidang Pendidikan dan Dakwah' },
    { label: 'B.6 Bidang PPPFS' },
    { label: 'B.7 Bidang Humas dan Lembaga' },
    { label: 'B.8 Bidang Pemeliharaan & Perlengkapan' },
    { label: 'B.9 Bidang Pemuda & Remaja Masjid' },
    { label: 'B.10 Bidang Pembinaan Wanita' },
];

const kategori = [
    { label: 'Operasional' },
    { label: 'Anak Yatim' },
    { label: 'Baitul Mal' },
    { label: 'Renovasi' }
]

const refs = [
    'A.1',
    'A.2.1',
    'A.2.2',
    'A.2.3',
    'A.2.4',
    'A.2.5',
    'A.2.6',
    'A.2.7',
    'A.2.8',
    'A.2.9',
    'A.2.10',
    'A.3.1',
    'A.3.2',
    'A.3.3',
    'A.4.1',
    'A.5.1',
    'B.1',
    'B.2',
    'B.3',
    'B.4',
    'B.5',
    'B.6',
    'B.7',
    'B.8',
    'B.9',
    'B.10',
]
