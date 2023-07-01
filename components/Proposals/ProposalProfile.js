// Import necessary MUI components
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ProposalProfile({ proposal, onClose }) {
  const router = useRouter();
  console.log("ProposalProfile received proposal:", proposal);
  const {
    proposalId,
    description,
    startDate,
    endDate,
    status,
    forVotes,
    againstVotes,
    dao,
    votes,
  } = proposal;

  console.log("proposl.votes:", proposal.votesAgainst, proposal.votesFor);

  // Sort the votes array by weight in descending order and slice it to get the top 5
  const topVotes = [...votes].sort((a, b) => b.weight - a.weight).slice(0, 5);

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 2, borderRadius: 2 }}>
      <IconButton onClick={onClose}>
        <ArrowBackIcon />
      </IconButton>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: proposal.state === "EXECUTED" ? "green" : "red",
            }}
          >
            {proposal.id}
          </Avatar>
        }
        title={`Proposal ID: ${proposal.id}`}
        subheader={`DAO: ${dao.name}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" color="text.secondary">
                Start Date: {startDate}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                End Date: {endDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Chip
                icon={<ThumbUp />}
                label={`Votes For: ${proposal.votesFor}`}
                color="primary"
              />
              <Chip
                icon={<ThumbDown />}
                label={`Votes Against: ${proposal.votesAgainst}`}
                color="secondary"
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" color="text.primary">
            Top 5 Delegate Votes
          </Typography>
          <List>
            {topVotes.map((vote, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Delegate ID: ${vote.id.split("-")[0]}`}
                  secondary={`Vote: ${vote.choice} - Weight: ${vote.weight}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProposalProfile;
