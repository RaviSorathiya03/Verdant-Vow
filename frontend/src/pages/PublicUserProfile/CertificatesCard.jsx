export default function CertificatesCard({ certificate }) {
  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg flex flex-col">
      <img src={certificate.image} alt={certificate.title} className="w-full h-60 rounded-md object-cover mb-4" />
      <Typography variant="h5" color="green">
        {certificate.title}
      </Typography>
      <Typography variant="small" color="gray">
        Issued by: {certificate.issuedBy}
      </Typography>
      <Typography variant="small" color="gray">
        Issued Date: {certificate.issuedDate}
      </Typography>
    </Card>
  );
}
