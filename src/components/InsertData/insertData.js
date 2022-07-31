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

export default function InsertData() {

    const [tanggalValue, setTanggalValue] = React.useState("");
    const [refValue, setRefValue] = React.useState(referensi[0]);
    const [refInput, setRefInput] = React.useState("");
    const [ketValue, setKetValue] = React.useState("");
    const [nominalValue, setNominalValue] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState([]);

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

        if (selectedFile.length !== 0) {

            console.log("lah kok masuk sini");

            let danaData = new FormData();
            danaData.append("tanggal", tanggalValue);
            danaData.append("referensi", refValue.label);
            danaData.append("keterangan", ketValue);
            danaData.append("imgBukti", selectedFile);
            danaData.append("nominal", nominalValue);


            var config = {
                method: 'post',
                url: 'http://localhost:4000/danaInput',
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

                    setTanggalValue("");
                    setRefValue("");
                    setKetValue("");
                    setNominalValue("");
                    setSelectedFile([]);
                    console.log(response.data);

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

            axios
                .post(
                    "http://localhost:4000/danaInputDefault", {

                    tanggal: tanggalValue,
                    referensi: refValue.label,
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

                    setTanggalValue("");
                    setRefValue("");
                    setKetValue("");
                    setNominalValue("");
                    setSelectedFile([]);
                    console.log(response.data);

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
            <div>
                <div className="flex flex-col">
                    <h1 className="font-sans font-bold text-left text-2xl pb-5">
                        Pemasukan Data
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
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Referensi" />}

                        />
                        <Autocomplete
                            disablePortal
                            value={refValue}
                            onChange={(e, newVal) => setRefValue(newVal)}
                            inputValue={refInput}
                            onInputChange={(e, newInputVal) => refHandle(newInputVal)}
                            id="combo-box-demo"
                            options={kategori}
                            sx={{ width: 200 }}
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
                    <div className="flex pt-2 space-x-2">
                        <Button variant="contained" component="label" type="button">
                            <AttachFileIcon /> Upload Dokumen
                            <input hidden accept="image/*" type="file" id="fileInput" onChange={handleChangeFile} />
                        </Button>
                        <h1 className="font-mono text-blue-400">{selectedFile.name}</h1>
                        {selectedFile.length === 0 ? <></> : <Button onClick={() => setSelectedFile([])}><ClearIcon /></Button>}
                    </div>

                </form>
            </div>
        </>
    );
}

const referensi = [
    { label: 'A.1 Saldo Tahun Sebelumnya' },
    { label: 'A.2.1' },
    { label: 'A.2.2' },
    { label: 'A.2.3' },
    { label: 'A.2.4' },
    { label: 'A.2.5' },
    { label: 'A.2.6' },
    { label: 'A.2.7' },
    { label: 'A.2.8' },
    { label: 'A.2.9' },
    { label: 'A.2.10' },
    { label: 'A.3.1' },
    { label: 'A.3.2' },
    { label: 'A.3.3' },
    { label: 'A.4.1' },
    { label: 'A.5.1' },

    { label: 'B.1' },
    { label: 'B.2' },
    { label: 'B.3' },
    { label: 'B.4' },
    { label: 'B.5' },
    { label: 'B.6' },
    { label: 'B.7' },
    { label: 'B.8' },
    { label: 'B.9' },
    { label: 'B.10' },
];

const kategori = [
    { label: 'Operasional'},
    { label: 'Anak Yatim'},
    { label: 'Baitul Mal'},
    { label: 'Renovasi'}
]
