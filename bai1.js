let tickets = [
    { pnr: "ABC123", passengerName: "Nguyen Van An", flight: "VN210", destination: "Ho Chi Minh", seat: "12A", ticketClass: "ECONOMY", baggageWeight: 25, status: "BOOKED" },
    { pnr: "DEF456", passengerName: "Tran Thi Binh", flight: "VN315", destination: "Da Nang", seat: "3B", ticketClass: "BUSINESS", baggageWeight: 20, status: "BOOKED" },
    { pnr: "GHI789", passengerName: "Le Minh Chau", flight: "VN180", destination: "Ha Noi", seat: "18C", ticketClass: "ECONOMY", baggageWeight: 15, status: "BOOKED" }
];

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    return tickets.findIndex(function (ticket) {
        return ticket.pnr === pnr;
    });
}

// Tinh phi hanh ly qua can
function calculateExcessBaggageFee(ticketClass, weight) {
    let limit = ticketClass === "BUSINESS" ? 30 : 20;
    return Math.max(0, weight - limit) * 50000;
}

// Hien thi danh sach ve
function listTickets() {
    if (tickets.length === 0) {
        console.log("Chua co ve nao");
        return;
    }

    console.log("===== DANH SACH VE MAY BAY =====");
    tickets.forEach(function (ticket) {
        console.log(ticket.pnr + " | " + ticket.passengerName +
            " | Chuyen bay: " + ticket.flight +
            " | Den: " + ticket.destination +
            " | Ghe: " + ticket.seat +
            " | Hang: " + ticket.ticketClass +
            " | Hanh ly: " + ticket.baggageWeight + " kg" +
            " | Trang thai: " + ticket.status);
    });
}

// Nhap can nang khong am
function inputWeight() {
    while (true) {
        let input = prompt("Nhap can nang hanh ly (kg):");

        if (input === null) {
            return null;
        }

        let weight = Number(input.trim());

        if (input.trim() !== "" && Number.isFinite(weight) && weight >= 0) {
            return weight;
        }

        console.log("Can nang phai la so khong am");
    }
}

// In the len may bay
function displayBoardingPass(ticket, fee) {
    console.log("===== THE LEN MAY BAY =====");
    console.log("Hanh khach: " + ticket.passengerName);
    console.log("Ma PNR: " + ticket.pnr);
    console.log("Chuyen bay: " + ticket.flight);
    console.log("Diem den: " + ticket.destination);
    console.log("Ghe ngoi: " + ticket.seat);
    console.log("Hang ve: " + ticket.ticketClass);
    console.log("Hanh ly: " + ticket.baggageWeight + " kg");
    console.log("Phi qua can: " + fee.toLocaleString("vi-VN") + " VNĐ");
    console.log("Trang thai: " + ticket.status);
}

// Check-in hanh khach
function checkIn() {
    let pnr = prompt("Nhap ma PNR gom 6 ky tu:");

    if (pnr === null) {
        return;
    }

    pnr = pnr.trim().toUpperCase();

    if (!/^[A-Z0-9]{6}$/.test(pnr)) {
        console.log("Ma PNR khong hop le");
        return;
    }

    let index = findTicketByPnr(pnr);

    if (index === -1) {
        console.log("Khong tim thay ve");
        return;
    }

    let ticket = tickets[index];

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong the check-in");
        return;
    }

    let weight = inputWeight();

    if (weight === null) {
        console.log("Da huy check-in");
        return;
    }

    let fee = calculateExcessBaggageFee(ticket.ticketClass, weight);

    ticket.baggageWeight = weight;
    ticket.status = "CHECKED_IN";

    console.log("Check-in thanh cong");
    displayBoardingPass(ticket, fee);
}

// Tim ve theo PNR hoac ten
function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chua nhap thong tin tim kiem");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = tickets.filter(function (ticket) {
        return ticket.pnr.toLowerCase() === keyword ||
            ticket.passengerName.toLowerCase().includes(keyword);
    });

    if (result.length === 0) {
        console.log("Khong tim thay ve");
        return;
    }

    result.forEach(function (ticket) {
        console.log(ticket.pnr + " | " + ticket.passengerName +
            " | " + ticket.flight + " | " + ticket.status);
    });
}

// Huy ve
function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy:");

    if (pnr === null) {
        return;
    }

    pnr = pnr.trim().toUpperCase();

    if (!/^[A-Z0-9]{6}$/.test(pnr)) {
        console.log("Ma PNR khong hop le");
        return;
    }

    let index = findTicketByPnr(pnr);

    if (index === -1) {
        console.log("Khong tim thay ve");
        return;
    }

    if (tickets[index].status === "CANCELLED") {
        console.log("Ve da bi huy");
        return;
    }

    let answer = prompt("Ban co chac muon huy ve? (Y/N)");

    if (answer === null || answer.trim().toUpperCase() !== "Y") {
        console.log("Da huy thao tac");
        return;
    }

    tickets[index].status = "CANCELLED";
    console.log("Huy ve thanh cong");
}

// Menu chinh
function main() {
    let choice;

    do {
        console.log("\n===== QUAY CHECK-IN SAN BAY =====");
        console.log("1. Xem danh sach ve");
        console.log("2. Check-in hanh khach");
        console.log("3. Tim ve");
        console.log("4. Huy ve");
        console.log("5. Thoat");

        choice = prompt("Nhap lua chon tu 1 den 5:");

        if (choice === null) {
            choice = "5";
        }

        switch (choice.trim()) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Ket thuc ca lam viec");
                break;

            default:
                console.log("Lua chon khong hop le");
        }
    } while (choice.trim() !== "5");
}

main();
