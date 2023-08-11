export const mailTo = (emailAddress, emailSubject) => {
    let mailtoLink = `mailto:${emailAddress}`;

    if (emailSubject) {
        mailtoLink += `?subject=${encodeURIComponent(emailSubject)}`;
    }

    window.location.href = mailtoLink;
}